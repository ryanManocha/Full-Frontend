import React, { useState, useEffect, useMemo } from 'react';
import DatasetStats from './DatasetStats';
import ImageGrid from './ImageGrid';
import ClassSidebar from './ClassSidebar';
import DatasetHeader from './DatasetHeader';
import { useUI } from '../../context/UIContext';
import { fetchTrainingImages } from '../../utils/supabase';

const DatasetViewer = () => {
  const [datasetData, setDatasetData] = useState(null);
  const [selectedClass, setSelectedClass] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentJobId, jobStatus } = useUI();


  // Get class color for object detection classes
  const getClassColor = (className) => {
    const colors = {
      'person': '#3b82f6',
      'car': '#ef4444',
      'bicycle': '#10b981',
      'motorcycle': '#f59e0b',
      'airplane': '#8b5cf6',
      'bus': '#06b6d4',
      'train': '#84cc16',
      'truck': '#f97316',
      'boat': '#06b6d4',
      'bird': '#10b981',
      'cat': '#f59e0b',
      'dog': '#8b5cf6',
      'horse': '#ef4444',
      'sheep': '#84cc16',
      'cow': '#6b7280',
      'elephant': '#8b5cf6',
      'bear': '#f59e0b',
      'zebra': '#6b7280',
      'giraffe': '#f97316'
    };
    return colors[className?.toLowerCase()] || '#3b82f6';
  };

  // Load dataset data from Supabase
  useEffect(() => {
    const loadDataset = async () => {
      if (!currentJobId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch real training images from Supabase
        const images = await fetchTrainingImages(currentJobId);
        
        if (images.length === 0) {
          setDatasetData(null);
          setLoading(false);
          return;
        }

        // Count classes for statistics
        const classCounts = {};
        images.forEach(img => {
          const className = img.class_name || 'unknown';
          classCounts[className] = (classCounts[className] || 0) + 1;
        });

        const classes = Object.entries(classCounts).map(([className, count]) => ({
          name: className,
          count: count,
          color: getClassColor(className)
        })).sort((a, b) => b.count - a.count);

        // Transform Supabase data to match our UI format
        const transformedImages = images.map((img, index) => ({
          id: img.id,
          name: img.file_name || `image_${index + 1}`,
          filename: img.file_name || `image_${index + 1}.jpg`,
          type1: img.class_name || 'unknown',
          type2: null,
          fileSize: Math.floor(Math.random() * 100 + 50), // 50-150 kB (placeholder)
          imageUrl: img.image_url,
          modelType: img.model_type || 'YOLOv8',
          cocoImageId: img.coco_image_id,
          createdAt: img.created_at
        }));

        const datasetData = {
          name: 'YOLO Training Dataset',
          description: `Training images for ${jobStatus?.class_trained || 'object detection'} model`,
          totalImages: images.length,
          classes: classes,
          images: transformedImages
        };
        
        setDatasetData(datasetData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dataset:', error);
        setError('Failed to load training images from Supabase');
        setLoading(false);
      }
    };

    loadDataset();
  }, [currentJobId, jobStatus]); // eslint-disable-line react-hooks/exhaustive-deps


  // Filter and sort images
  const filteredAndSortedImages = useMemo(() => {
    if (!datasetData) return [];

    let filtered = datasetData.images;

    // Filter by class
    if (selectedClass !== 'all') {
      filtered = filtered.filter(img => 
        img.type1 === selectedClass
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.type1.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort images
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.fileSize - a.fileSize;
        case 'type':
          return a.type1.localeCompare(b.type1);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [datasetData, selectedClass, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-white/70">Loading training images from Supabase...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-2">Error loading training images</p>
        <p className="text-white/50 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!datasetData || !currentJobId) {
    return (
      <div className="text-center py-8">
        <p className="text-white/70">No training dataset available</p>
        <p className="text-white/50 text-sm">Start a training job to view images</p>
      </div>
    );
  }

  if (datasetData.images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/70">No training images found</p>
        <p className="text-white/50 text-sm">Training may still be in progress or no images were generated</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      {/* Header */}
      <DatasetHeader 
        datasetName={datasetData.name}
        description={datasetData.description}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ClassSidebar 
          classes={datasetData.classes}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          totalImages={datasetData.totalImages}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Stats */}
          <DatasetStats 
            totalImages={filteredAndSortedImages.length}
            totalClasses={datasetData.classes.length}
            selectedClass={selectedClass}
          />

          {/* Image Grid */}
          <div className="flex-1 overflow-auto p-4">
            <div className="min-h-full">
              <ImageGrid 
                images={filteredAndSortedImages}
                viewMode={viewMode}
                selectedClass={selectedClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetViewer;