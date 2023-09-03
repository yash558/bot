import React, { useState } from 'react';
import axios from 'axios';

function FileUploadPage() {
  const [csvFiles, setcsvFiles] = useState([]);
  const [csvFilestwo, setcsvFilesTwo] = useState([]);
  const [uploadedData, setUploadedData] = useState({});
  const [uploadedDataTwo, setUploadedDataTwo] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingTwo, setIsUploadingTwo] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileNameTwo, setSelectedFileNameTwo] = useState('');

  const handlecsvFilesChange = (event) => {
    setcsvFiles(event.target.files);
    setSelectedFileName(event.target.files[0].name);
  };

  const handlecsvFilesChangetwo = (event) => {
    setcsvFilesTwo(event.target.files);
    setSelectedFileNameTwo(event.target.files[0].name);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    for (const file of csvFiles) {
      formData.append('files', file);
    }

    try {
      setIsUploading(true);
      const response = await axios.post(`https://opdsure.net/malbi/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadtwo = async () => {
    const formData = new FormData();

    for (const file of csvFilestwo) {
      formData.append('files', file);
    }

    try {
      setIsUploadingTwo(true);
      const response = await axios.post(`https://opdsure.net/malbi/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedDataTwo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploadingTwo(false);
    }
  };

  const handleBack = () => {
    
  };

  return (
    <div className="bg-gray-200 px-32 min-h-screen flex flex-col items-start justify-start py-20">
      <div className="container mx-auto">
      <button
  onClick={handleBack}
  className="border border-white bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
>
  Back
</button>

        <div className="flex items-center justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h1 className="text-3xl font-semibold mb-4 text-center text-blue-900">
              PCAP Conversion Tool
            </h1>
            <h2 className="text-xl mb-2 text-blue-700">Upload CSV File</h2>
            <div className="flex items-center">
              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out">
                {selectedFileName || 'Choose File'}
                <input
                  type="file"
                  multiple
                  onChange={handlecsvFilesChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleUpload}
                disabled={isUploading || !selectedFileName}
                className={`ml-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h1 className="text-3xl font-semibold mb-4 text-center text-blue-900">
              Botnet Prediction Tool
            </h1>
            <h2 className="text-xl mb-2 text-blue-700">Upload CSV File</h2>
            <div className="flex items-center">
              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out">
                {selectedFileNameTwo || 'Choose File'}
                <input
                  type="file"
                  multiple
                  onChange={handlecsvFilesChangetwo}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleUploadtwo}
                disabled={isUploadingTwo || !selectedFileNameTwo}
                className={`ml-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out ${
                  isUploadingTwo ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploadingTwo ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out">
            {Object.keys(uploadedData).length > 0 && (
              <div>
                <h2 className="text-xl mb-4 text-blue-900">Uploaded Data One</h2>
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                  <pre className="whitespace-pre-wrap text-blue-800">
                    {JSON.stringify(uploadedData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out">
            {Object.keys(uploadedDataTwo).length > 0 && (
              <div>
                <h2 className="text-xl mb-4 text-blue-900">Uploaded Data Two</h2>
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                  <pre className="whitespace-pre-wrap text-blue-800">
                    {JSON.stringify(uploadedDataTwo, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default FileUploadPage;
