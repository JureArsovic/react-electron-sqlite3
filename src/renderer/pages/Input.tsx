import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import InputFields from '../components/InputFields';
import { Article, insertArticle } from 'main/services/Database.service';
import ConfirmButton from '../components/ConfirmButton';
import '../components/Alert.css';
import Alert from '../components/Alert';

const Input: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [place, setPlace] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  
  const handleBiblatexChange = (value: string) => {
    const authorRegex = /author\s*=\s*"([^"]*)"/;
    const titleRegex = /title\s*=\s*"([^"]*)"/;
    const articleTypeRegex = /^@(\w+)/;
    const yearRegex = /year\s*=\s*(\d+)/;

    const authorMatches = value.match(authorRegex);
    const titleMatches = value.match(titleRegex);
    const articleTypeMatches = value.match(articleTypeRegex);
    const yearMatches = value.match(yearRegex);

    if (authorMatches && authorMatches.length === 2) {
      const author = authorMatches[1];
      console.log('Author:', author);
      setAuthor(authorMatches[1]);
    } else {
      console.log('Failed to extract author from BibTeX string');
    }

    if (titleMatches && titleMatches.length === 2) {
      const title = titleMatches[1];
      console.log('Title:', title);
      setTitle(titleMatches[1]);
    } else {
      console.log('Failed to extract title from BibTeX string');
    }

    if (yearMatches && yearMatches.length === 2) {
      const year = yearMatches[1];
      setYear(yearMatches[1]);
      console.log('Year:', year);
    } else {
      console.log('Failed to extract year from BibTeX string');
    }

    if (articleTypeMatches && articleTypeMatches.length === 2) {
      const articleType = articleTypeMatches[1];
      setType(articleTypeMatches[1]);
      console.log('Article Type:', articleType);
      switch (articleType) {
        case 'article':
          const journalRegex = /journal\s*=\s*"([^"]*)"/;
          const journalMatches = value.match(journalRegex);
          if (journalMatches && journalMatches.length === 2) {
            const journal = journalMatches[1];
            setPlace(journalMatches[1]);
            console.log('Journal:', journal);
          } else {
            console.log('Failed to extract journal from BibTeX string');
          }
          break;
    
        case 'inproceedings':
          const conferenceRegex = /booktitle\s*=\s*"([^"]+)"/;
          const conferenceMatches = value.match(conferenceRegex);
          if (conferenceMatches && conferenceMatches.length === 2) {
            const conference = conferenceMatches[1];
            setPlace(conferenceMatches[1]);
            console.log('Conference:', conference);
          } else {
            console.log('Failed to extract conference from BibTeX string');
          }
          break;

      }
    } else {
      console.log('Failed to extract article type from BibTeX string');
    }

  };

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
  };

  async function readFileAsBuffer(file: File): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const resultArrayBuffer = reader.result as ArrayBuffer;
        const buffer = Buffer.from(resultArrayBuffer);
        resolve(buffer);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsArrayBuffer(file);
    });
  }
  


  const handleConfirmInput = async () => {
    if (title.trim() === '' || author.trim() === '') {
      setAlertType('error');
      setAlertMessage('The BibTeX string is invalid');
      setShowAlert(true);
    } else {
      try {
        let pdfFileData: Buffer | null = null;
  
        // If file is provided, read it as Buffer
        if (file) {
          pdfFileData = await readFileAsBuffer(file);
        }
  
        const articleData: Article = {
          id: 0,
          title: title,
          type: type,
          author: author,
          publication: place,
          year: parseInt(year),
          pdfFile: pdfFileData,
        };
  
        console.log('Data to be inserted:');
        console.log(articleData);
  
        insertArticle(articleData);
  
        // Reset the input fields after successful saving
        setAuthor('');
        setTitle('');
        setType('');
        setYear('');
        setPlace('');
        setFile(null);
        setErrorMessage('');
  
        // Show success alert
        setAlertType('success');
        setAlertMessage('Article input successful');
        setShowAlert(true);
      } catch (error) {
        // Handle error during database insertion
        console.error('Error inserting article:', error);
        setErrorMessage('Failed to insert article');
      }
    }
  };
  

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
    height: 'calc(100vh - 180px)', // Po potrebi spreminjamo glede na header
    overflow: 'auto',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  };

  return (
    <div>
      <Header />
      <div style={containerStyle}>
        {/* Content */}
        <InputFields
          onChangeBibtex={handleBiblatexChange}
          onChangeFile={handleFileChange}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <div style={buttonContainerStyle}>
          <Button to="/home">Go back to Home Page</Button>
          <ConfirmButton to="/list" onClick={handleConfirmInput}>
            Confirm Input
          </ConfirmButton>
        </div>
        {showAlert && (
          <Alert type={alertType} message={alertMessage} onClose={handleAlertClose} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Input;