import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export interface UploadProgress {
  [fileName: string]: number;
}

export interface MediaUploadResult {
  mediaId: string;
  fileUrl: string;
}

export const useMediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

  // File validation function
  const validateFile = useCallback((file: File): void => {
    // Supported types
    const supportedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/ogg'
    ];
    
    // Size limit (10MB)
    const maxSize = 10 * 1024 * 1024;
    
    if (!supportedTypes.includes(file.type)) {
      throw new Error(`Unsupported file type: ${file.type}`);
    }
    
    if (file.size > maxSize) {
      throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max 10MB)`);
    }
    
    // Additional validation for file name
    if (!file.name || file.name.trim() === '') {
      throw new Error('File must have a valid name');
    }
    
    // Basic MIME type validation against file extension
    const extension = file.name.toLowerCase().split('.').pop();
    const mimeTypeMap: Record<string, string[]> = {
      'jpg': ['image/jpeg'],
      'jpeg': ['image/jpeg'],
      'png': ['image/png'],
      'gif': ['image/gif'],
      'webp': ['image/webp'],
      'mp4': ['video/mp4'],
      'webm': ['video/webm'],
      'ogg': ['video/ogg']
    };
    
    if (extension && mimeTypeMap[extension] && !mimeTypeMap[extension].includes(file.type)) {
      throw new Error(`File extension (${extension}) does not match MIME type (${file.type})`);
    }
  }, []);

  // Upload single file with progress tracking
  const uploadFileWithProgress = useCallback(async (
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<MediaUploadResult> => {
    try {
      // 1. Validate file
      validateFile(file);

      // 2. Request SAS URL
      const { uploadUrl, fileUrl, mediaId } = await apiClient.requestSasUpload(file);
      
      // 3. Upload to Azure Blob Storage with progress tracking using XMLHttpRequest
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            onProgress?.(progress);
          }
        });
        
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve({ mediaId, fileUrl });
          } else {
            const errorMessage = xhr.status === 403 
              ? 'Upload failed: SAS URL expired or invalid permissions.'
              : xhr.status === 404
              ? 'Upload failed: Azure storage container not found.'
              : xhr.status === 409
              ? 'Upload failed: Blob already exists.'
              : xhr.status === 413
              ? 'Upload failed: File too large for Azure storage.'
              : xhr.status === 400
              ? 'Upload failed: Invalid file or request.'
              : `Azure upload failed: ${xhr.status}`;
            reject(new Error(errorMessage));
          }
        });
        
        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed: Network error or connection timeout'));
        });
        
        xhr.addEventListener('timeout', () => {
          reject(new Error('Upload failed: Request timeout'));
        });
        
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
        xhr.timeout = 30000; // 30 second timeout
        xhr.send(file);
      });
      
    } catch (error) {
      console.error('Media upload failed:', error);
      
      // Enhanced error handling with specific error types
      if (error instanceof Error) {
        // Handle SAS URL request errors
        if (error.message.includes('401')) {
          throw new Error('Authentication required. Please login again.');
        } else if (error.message.includes('413')) {
          throw new Error('File too large for server. Please select a smaller file.');
        } else if (error.message.includes('415')) {
          throw new Error('File type not supported by server.');
        } else if (error.message.includes('400')) {
          throw new Error('Invalid file metadata. Please try a different file.');
        }
      }
      
      throw error;
    }
  }, [validateFile]);

  // Upload multiple files
  const uploadFiles = useCallback(async (files: File[]): Promise<MediaUploadResult[]> => {
    setUploading(true);
    const results: MediaUploadResult[] = [];
    
    try {
      // Reset progress
      setUploadProgress({});
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Upload with progress tracking
        const result = await uploadFileWithProgress(file, (progress) => {
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        });
        
        results.push(result);
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      }
      
      return results;
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  }, [uploadFileWithProgress]);

  // Upload single file (for backward compatibility)
  const uploadSingleFile = useCallback(async (file: File): Promise<MediaUploadResult> => {
    setUploading(true);
    
    try {
      setUploadProgress({ [file.name]: 0 });
      
      const result = await uploadFileWithProgress(file, (progress) => {
        setUploadProgress({ [file.name]: progress });
      });
      
      setUploadProgress({ [file.name]: 100 });
      return result;
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  }, [uploadFileWithProgress]);

  // Format file size for display
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    uploadFiles,
    uploadSingleFile,
    uploading,
    uploadProgress,
    validateFile,
    formatFileSize
  };
};