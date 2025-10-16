import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  VideoFile as VideoIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const FileUploadDialog = ({ open, onClose, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <ImageIcon />;
    if (type === 'application/pdf') return <PdfIcon />;
    if (type.startsWith('video/')) return <VideoIcon />;
    return <FileIcon />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    setUploading(true);
    
    for (const fileItem of files) {
      if (fileItem.status === 'pending') {
        setUploadProgress(prev => ({ ...prev, [fileItem.id]: 0 }));
        
        try {
          // Simulate file upload progress
          for (let progress = 0; progress <= 100; progress += 10) {
            setUploadProgress(prev => ({ ...prev, [fileItem.id]: progress }));
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
          // Update file status
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id ? { ...f, status: 'completed' } : f
          ));
          
          // Call upload callback
          if (onUpload) {
            onUpload(fileItem.file);
          }
        } catch (error) {
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id ? { ...f, status: 'error' } : f
          ));
        }
      }
    }
    
    setUploading(false);
  };

  const handleClose = () => {
    setFiles([]);
    setUploadProgress({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <UploadIcon sx={{ mr: 1 }} />
          Upload Files
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            accept="image/*,application/pdf,video/*,.doc,.docx,.txt"
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<AttachFileIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              Choose Files to Upload
            </Button>
          </label>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Supported formats: Images, PDFs, Videos, Documents (Max 10MB each)
          </Typography>
        </Box>

        {files.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Selected Files ({files.length})
            </Typography>
            <List>
              {files.map((fileItem) => (
                <ListItem key={fileItem.id} divider>
                  <ListItemIcon>
                    {getFileIcon(fileItem.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={fileItem.name}
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {formatFileSize(fileItem.size)}
                        </Typography>
                        {fileItem.status === 'uploading' && (
                          <LinearProgress 
                            variant="determinate" 
                            value={uploadProgress[fileItem.id] || 0}
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {fileItem.status === 'completed' && (
                        <CheckCircleIcon color="success" />
                      )}
                      {fileItem.status === 'error' && (
                        <ErrorIcon color="error" />
                      )}
                      {fileItem.status === 'pending' && (
                        <Chip label="Pending" size="small" color="default" />
                      )}
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(fileItem.id)}
                        disabled={fileItem.status === 'uploading'}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={files.length === 0 || uploading}
          startIcon={<UploadIcon />}
        >
          {uploading ? 'Uploading...' : `Upload ${files.length} Files`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;


