import React from 'react';

interface InputFieldsProps {
  onChangeBibtex: (value: string) => void;
  onChangeFile: (file: File) => void;
}

const InputFields: React.FC<InputFieldsProps> = ({ onChangeBibtex, onChangeFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate the file type
      if (selectedFile.type === 'application/pdf') {
        onChangeFile(selectedFile);
      } else {
        // Handle invalid file type
        console.log('Invalid file type. Only PDF files are allowed.');
      }
    }
  };

  const containerStyle: React.CSSProperties = {
    border: '2px solid #999',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    width: '50%',
    margin: '0 auto', // Center the container horizontally
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: 'calc(100% - 1rem)', // Subtract 1rem from the input width
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>
        BibTeX:
        <textarea
          style={inputStyle}
          onChange={(e) => onChangeBibtex(e.target.value)}
        />
      </label>
      <label style={labelStyle}>
        File (PDF format required):
        <input
          type="file"
          style={inputStyle}
          accept=".pdf" // Limit file type to PDF
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default InputFields;
