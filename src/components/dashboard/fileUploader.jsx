import React, { useState } from 'react';
import apiHandler from '../../functions/apiHandler';

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle folder or multiple files selection
  const handleFilesChange = (event) => {
    setFiles(Array.from(event.target.files));
    setMessage('');
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select files to upload');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
debugger
      // Append all files with the same key 'files'
      files.forEach((file) => {
        formData.append('files', file);
      });

      formData.append('permission', 'public'); // or 'private'
      formData.append('gameId', '028a0075-ee90-4607-a660-02082817cdd4'); // example gameId
      // formData.append('assignedUserIds', JSON.stringify(['762d5209-fd23-4b54-9aa2-03c1a4f69170']));

      // Call your backend API
      const response = await apiHandler.post('/file', formData);

      console.log('Uploaded files:', response.data);
      setMessage('All files uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Upload failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Folder / Files to DigitalOcean</h2>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFilesChange}
      />
      <br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>

      {message && <p>{message}</p>}

      {files.length > 0 && (
        <div>
          <h4>Files to Upload:</h4>
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.webkitRelativePath || file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
