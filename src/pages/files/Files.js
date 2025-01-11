import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Table from '../../components/table/Table';
import SearchBar from '../../components/SearchBar';
import Dialog from '../../components/Dialog';
import useStore from '../../hooks/store';
import { fileService } from '../../api';
import './Files.css';
import FileForm from './FileForm.js';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';


function Files() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const { 
    data: filesResponse, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['files'],
    queryFn: fileService.getFiles,
  });

  // Ensure files is always an array
  const files = filesResponse?.data || [];

  const createFileMutation = useMutation({
    mutationFn: fileService.createFile,
    onSuccess: (newFile) => {
      queryClient.setQueryData(['files'], (oldData) => {
        const oldFiles = Array.isArray(oldData) ? oldData : oldData.files || [];
        return { files: [...oldFiles, newFile] };
      });
      setIsDialogOpen(false);
    },
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRowClick = (file) => {
    setSelectedFile(file);
    setIsDialogOpen(true);
    setIsEditing(false);
  };

  const handleCreate = () => {
    setSelectedFile(null);
    setIsDialogOpen(true);
    setIsEditing(true);
  };

  const handleFileSubmit = (values) => {
    createFileMutation.mutate(values);
  };

  const handleSave = (file) => {
    if (isEditing) {
      createFileMutation.mutate(file);
    } else {
      // Handle update
      // You can add an updateFileMutation here similar to createFileMutation
    }
  };

  const normalizeLabel = (key) => {
    return key
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else if (Array.isArray(obj[k])) {
        acc[pre + k] = obj[k].join(', '); // Convert arrays to comma-separated strings
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };
  
  const columnHelper = createColumnHelper();

  const ignoredColumns = ['id', 'objectType', 'folder', 'rootPath', 'path', 'extension', 'elements'];

  const columns = React.useMemo(() => {
    if (files.length === 0) return [];
    
    return Object.keys(files[0])
      .filter(key => !ignoredColumns.includes(key))
      .map(key => 
        columnHelper.accessor(key, {
          header: () => normalizeLabel(key),
          cell: info => {
            const value = info.getValue();
            if (value === null || value === undefined) return 'N/A';
            
            if (Array.isArray(value)) {
              return value.map(item => {
                if (typeof item === 'object' && item !== null) {
                  return item.name || JSON.stringify(item);
                }
                return item;
              }).join(', ');
            }
            
            if (typeof value === 'object' && value !== null) {
              return value.name || JSON.stringify(value);
            }
            
            return value.toString();
          },
        })
      );
  }, [files]);
  
  const filteredFiles = files.filter((file) =>
    Object.entries(file)
      .filter(([key]) => !ignoredColumns.includes(key))
      .some(([key, value]) => {
        if (value === null || value === undefined) return false;
        
        if (Array.isArray(value)) {
          return value.some(item => {
            if (typeof item === 'object' && item !== null) {
              return item.name && item.name.toString().toLowerCase().includes(searchTerm.toLowerCase());
            }
            return item.toString().toLowerCase().includes(searchTerm.toLowerCase());
          });
        }
        
        if (typeof value === 'object' && value !== null) {
          return value.name && value.name.toString().toLowerCase().includes(searchTerm.toLowerCase());
        }
        
        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  return (
    <div className="files-container">
      <h1>Files</h1>
      <SearchBar onSearch={handleSearch} />
      <button onClick={handleCreate}>Create New File</button>
      {filteredFiles.length > 0 ? (
      <div className="table-container">
      <Table columns={columns} data={filteredFiles} onRowClick={handleRowClick} />
      </div>
    ) : (
      <p>No files found. Create a new file or adjust your search.</p>
    )}
    <Dialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      title={isEditing ? 'Create File' : 'File Details'}
    >
      {isEditing ? (
        <FileForm onSubmit={handleFileSubmit} />
      ) : (
        selectedFile && (
          <div>
            <input
              value={selectedFile.name || ''}
              onChange={(e) => setSelectedFile({ ...selectedFile, name: e.target.value })}
              readOnly={!isEditing}
            />
            {/* Add more fields for viewing file details */}
          </div>
        )
      )}
    </Dialog>
    </div>
  );
}

export default Files;