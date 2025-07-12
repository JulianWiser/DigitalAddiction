/**
 * Learning Hub page containing detailed course materials, research papers, and interactive lessons
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download,
  Search,
  Clock,
  Brain,
  Lightbulb,
  ExternalLink,
  Play,
  Users,
  Star,
  ChevronRight,
  Filter,
  Tag,
  Bookmark,
  Eye,
  ThumbsUp,
  CheckCircle,
  TrendingUp,
  Smartphone,
  Shield
} from 'lucide-react';
import Navigation from '../components/Navigation';
import InteractiveQuiz from '../components/InteractiveQuiz';
import StudyTimer from '../components/StudyTimer';
import QuickNotes from '../components/QuickNotes';
import SearchBar from '../components/SearchBar';
import Flashcards from '../components/Flashcards';
import LearningPath from '../components/LearningPath';
import PersonalizedDashboard from '../components/PersonalizedDashboard';

/**
 * Interface for learning modules
 */
interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'research' | 'interactive';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  views: number;
  likes: number;
  bookmarked: boolean;
  completed: boolean;
  thumbnail?: string;
}

/**
 * Interface for research papers
 */
interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  category: string;
  downloadLink: string;
  cited: number;
}

export default function LearningHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [bookmarkedModules, setBookmarkedModules] = useState<string[]>([]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Load saved data from localStorage
  React.useEffect(() => {
    const savedBookmarks = localStorage.getItem('learningBookmarks');
    const savedCompleted = localStorage.getItem('completedModules');
    
    if (savedBookmarks) setBookmarkedModules(JSON.parse(savedBookmarks));
    if (savedCompleted) setCompletedModules(JSON.parse(savedCompleted));
  }, []);

  // Save data to localStorage
  React.useEffect(() => {
    localStorage.setItem('learningBookmarks', JSON.stringify(bookmarkedModules));
  }, [bookmarkedModules]);

  React.useEffect(() => {
    localStorage.setItem('completedModules', JSON.stringify(completedModules));
  }, [completedModules]);

  // Sample learning modules
  const learningModules: LearningModule[] = [
    {
      id: '1',
      title: 'The Neuroscience of Digital Addiction',
      description: 'Deep dive into how digital platforms hijack dopamine pathways and create compulsive behaviors.',
      type: 'video',
      duration: '24 min',
      difficulty: 'intermediate',
      category: 'Neuroscience',
      views: 1234,
      likes: 89,
      bookmarked: bookmarkedModules.includes('1'),
      completed: completedModules.includes('1')
    },
    {
      id: '2',
      title: 'Intermittent Reinforcement in Social Media',
      description: 'Understanding how unpredictable rewards make platforms more addictive than slot machines.',
      type: 'interactive',
      duration: '18 min',
      difficulty: 'beginner',
      category: 'Psychology',
      views: 892,
      likes: 67,
      bookmarked: bookmarkedModules.includes('2'),
      completed: completedModules.includes('2')
    },
    {
      id: '3',
      title: 'Cognitive Behavioral Therapy for Internet Addiction',
      description: 'Evidence-based treatment approaches and therapeutic techniques for digital wellness.',
      type: 'article',
      duration: '32 min',
      difficulty: 'advanced',
      category: 'Treatment',
      views: 756,
      likes: 45,
      bookmarked: bookmarkedModules.includes('3'),
      completed: completedModules.includes('3')
    },
    {
      id: '4',
      title: 'The Attention Economy: How Tech Companies Monetize Focus',
      description: 'Business models behind attention capture and the economics of user engagement.',
      type: 'video',
      duration: '28 min',
      difficulty: 'intermediate',
      category: 'Business',
      views: 1567,
      likes: 112,
      bookmarked: bookmarkedModules.includes('4'),
      completed: completedModules.includes('4')
    },
    {
      id: '5',
      title: 'Mindfulness-Based Digital Wellness Interventions',
      description: 'Research on mindfulness practices for reducing problematic technology use.',
      type: 'research',
      duration: '45 min',
      difficulty: 'advanced',
      category: 'Interventions',
      views: 543,
      likes: 34,
      bookmarked: bookmarkedModules.includes('5'),
      completed: completedModules.includes('5')
    },
    {
      id: '6',
      title: 'Social Comparison Theory and Instagram',
      description: 'How social media platforms exploit our natural tendency to compare ourselves to others.',
      type: 'interactive',
      duration: '22 min',
      difficulty: 'beginner',
      category: 'Psychology',
      views: 998,
      likes: 78,
      bookmarked: bookmarkedModules.includes('6'),
      completed: completedModules.includes('6')
    }
  ];

  // Sample research papers
  const researchPapers: ResearchPaper[] = [
    {
      id: '1',
      title: 'The relationship between smartphone use and academic performance: A meta-analysis',
      authors: ['Johnson, M.', 'Smith, K.', 'Brown, L.'],
      journal: 'Journal of Educational Psychology',
      year: 2023,
      abstract: 'This meta-analysis examines 47 studies investigating the relationship between smartphone use and academic performance among college students...',
      category: 'Education',
      downloadLink: '#',
      cited: 156
    },
    {
      id: '2',
      title: 'Neural mechanisms of internet addiction: A neuroimaging meta-analysis',
      authors: ['Wang, Y.', 'Liu, X.', 'Chen, Z.'],
      journal: 'Nature Neuroscience',
      year: 2023,
      abstract: 'Neuroimaging studies reveal altered brain connectivity patterns in individuals with internet addiction, particularly in reward and executive control circuits...',
      category: 'Neuroscience',
      downloadLink: '#',
      cited: 243
    },
    {
      id: '3',
      title: 'Effectiveness of digital detox interventions: A systematic review',
      authors: ['Anderson, P.', 'Davis, R.'],
      journal: 'Clinical Psychology Review',
      year: 2024,
      abstract: 'Systematic review of 32 randomized controlled trials examining various digital detox interventions and their efficacy...',
      category: 'Treatment',
      downloadLink: '#',
      cited: 89
    }
  ];

  const categories = ['all', 'Neuroscience', 'Psychology', 'Treatment', 'Business', 'Interventions', 'Education'];
  const types = ['all', 'video', 'article', 'research', 'interactive'];

  /**
   * Filter learning modules based on search and filters
   */
  const filteredModules = learningModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    const matchesType = selectedType === 'all' || module.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  /**
   * Get icon for module type
   */
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'research': return <Brain className="w-4 h-4" />;
      case 'interactive': return <Lightbulb className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  /**
   * Get difficulty color
   */
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-900/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/30';
      case 'advanced': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  /**
   * Toggle bookmark status for a module
   */
  const toggleBookmark = (moduleId: string) => {
    setBookmarkedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  /**
   * Mark module as completed
   */
  const markAsCompleted = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  /**
   * Handle search functionality
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation />
      
      {/* Header */}
      <header className="relative bg-gradient-to-r from-gray-900 via-purple-900/30 to-indigo-900/30 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-indigo-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/40 text-purple-300 rounded-full text-sm mb-6 backdrop-blur-sm border border-purple-700/30">
              <Brain className="w-4 h-4" />
              Comprehensive Learning Resources
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
              Learning Hub
            </h1>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Dive deep into the science of digital addiction with interactive lessons, research papers, 
              video content, and evidence-based interventions from leading experts in the field.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-400">Learning Modules</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-indigo-400">25+</div>
                <div className="text-sm text-gray-400">Research Papers</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-blue-400">100+</div>
                <div className="text-sm text-gray-400">Hours Content</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-green-400">15</div>
                <div className="text-sm text-gray-400">Expert Authors</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="flex-1">
                <SearchBar onSearch={handleSearch} placeholder="Search learning materials..." />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Personal Dashboard */}
            <section>
              <PersonalizedDashboard />
            </section>

            {/* Interactive Learning Tools */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                Interactive Learning Tools
              </h2>
              
              <div className="grid gap-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <InteractiveQuiz />
                  <StudyTimer />
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <Flashcards />
                  <QuickNotes />
                </div>
              </div>
            </section>

            {/* Learning Path */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                Learning Path
              </h2>
              <LearningPath />
            </section>
            {/* Learning Modules */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-400" />
                Learning Modules
              </h2>
              
              <div className="grid gap-6">
                {filteredModules.map((module) => (
                  <div key={module.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors group">
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="w-24 h-16 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(module.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {module.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleBookmark(module.id)}
                              className="text-gray-400 hover:text-yellow-400 transition-colors"
                            >
                              <Bookmark className={`w-4 h-4 ${bookmarkedModules.includes(module.id) ? 'text-yellow-400 fill-current' : ''}`} />
                            </button>
                            {completedModules.includes(module.id) && <CheckCircle className="w-4 h-4 text-green-400" />}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          {module.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                            {module.difficulty}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {module.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {module.likes}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-purple-400 text-sm font-medium">
                            {module.category}
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setSelectedModule(module.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              {completedModules.includes(module.id) ? 'Review' : 'Start Learning'}
                            </button>
                            {!completedModules.includes(module.id) && (
                              <button
                                onClick={() => markAsCompleted(module.id)}
                                className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                              >
                                Mark Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Research Papers */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-indigo-400" />
                Research Papers
              </h2>
              
              <div className="grid gap-6">
                {researchPapers.map((paper) => (
                  <div key={paper.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {paper.title}
                      </h3>
                      <div className="text-sm text-gray-400 mb-2">
                        <span className="text-indigo-300">{paper.authors.join(', ')}</span>
                        {' • '}
                        <span>{paper.journal}</span>
                        {' • '}
                        <span>{paper.year}</span>
                        {' • '}
                        <span>Cited {paper.cited} times</span>
                      </div>
                      <span className="inline-block px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full">
                        {paper.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {paper.abstract}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        View Full Abstract
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Learning Progress */}
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-700/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-400" />
                Learning Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Modules Completed</span>
                    <span className="text-purple-400">2/6</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Papers Read</span>
                    <span className="text-indigo-400">1/3</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Learning Hours</span>
                    <span className="text-blue-400">12.5h</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Popular Topics
              </h3>
              <div className="space-y-3">
                {['Neuroscience', 'Behavioral Psychology', 'Digital Interventions', 'Social Media', 'Mindfulness'].map((topic, index) => (
                  <div key={topic} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{topic}</span>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bookmarked Items */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-yellow-400" />
                Bookmarked ({bookmarkedModules.length})
              </h3>
              <div className="space-y-3">
                {bookmarkedModules.length === 0 ? (
                  <p className="text-gray-400 text-sm">No bookmarked items yet</p>
                ) : (
                  learningModules.filter(m => bookmarkedModules.includes(m.id)).map((module) => (
                    <div key={module.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
                         onClick={() => setSelectedModule(module.id)}>
                      {getTypeIcon(module.type)}
                      <div className="flex-1">
                        <div className="text-sm text-gray-300 truncate">{module.title}</div>
                        <div className="text-xs text-gray-500">{module.duration}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Content Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {learningModules.find(m => m.id === selectedModule)?.title}
                </h2>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
              
              <div className="prose prose-invert max-w-none">
                {selectedModule === '1' && (
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-300 mb-4">Learning Objectives</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Understand how dopamine pathways are affected by digital stimuli</li>
                        <li>• Learn about the neuroplasticity changes in digital addiction</li>
                        <li>• Explore the role of reward prediction error in habit formation</li>
                        <li>• Identify brain regions involved in impulse control and decision-making</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-300 mb-4">Key Concepts</h3>
                      <div className="space-y-4 text-gray-300">
                        <div>
                          <h4 className="font-semibold text-white">Dopamine and Reward Systems</h4>
                          <p>Digital platforms exploit the brain's natural reward system by triggering dopamine releases in patterns similar to gambling and substance abuse.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Neuroplasticity</h4>
                          <p>Repeated exposure to digital stimuli can physically alter brain structure, particularly in areas responsible for attention and impulse control.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Variable Ratio Reinforcement</h4>
                          <p>The unpredictable nature of social media notifications creates the strongest form of behavioral conditioning.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-300 mb-4">Interactive Exercise</h3>
                      <p className="text-gray-300 mb-4">Reflect on your own digital habits and identify which neurochemical pathways might be involved:</p>
                      <textarea 
                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                        placeholder="Write your thoughts here..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          markAsCompleted(selectedModule);
                          setSelectedModule(null);
                        }}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        Mark as Complete
                      </button>
                      <button
                        onClick={() => toggleBookmark(selectedModule)}
                        className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                      >
                        {bookmarkedModules.includes(selectedModule) ? 'Remove Bookmark' : 'Bookmark'}
                      </button>
                    </div>
                  </div>
                )}

                {selectedModule === '2' && (
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-300 mb-4">Understanding Variable Rewards</h3>
                      <p className="text-gray-300 mb-4">
                        Social media platforms use intermittent reinforcement schedules that create stronger habits than consistent rewards. 
                        This is the same mechanism that makes gambling addictive.
                      </p>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">Key Statistics:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• 95% of text messages are read within 3 minutes</li>
                          <li>• TikTok users become "addicted" after 260 videos (~35 minutes)</li>
                          <li>• Variable ratio schedules create 5x stronger habits than fixed schedules</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-300 mb-4">Real-World Application</h3>
                      <p className="text-gray-300 mb-4">
                        Consider how you can use this knowledge to your advantage by creating positive variable reward systems in your life.
                      </p>
                      <textarea 
                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                        placeholder="How might you apply variable reinforcement to build positive habits?"
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          markAsCompleted(selectedModule);
                          setSelectedModule(null);
                        }}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        Mark as Complete
                      </button>
                      <button
                        onClick={() => toggleBookmark(selectedModule)}
                        className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                      >
                        {bookmarkedModules.includes(selectedModule) ? 'Remove Bookmark' : 'Bookmark'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Default content for other modules */}
                {!['1', '2'].includes(selectedModule) && (
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-300 mb-4">Course Content</h3>
                      <p className="text-gray-300 mb-4">
                        This module covers important concepts in digital psychology and addiction research.
                        Content is being developed based on the latest research findings.
                      </p>
                      <div className="bg-yellow-900/30 border border-yellow-500/30 p-4 rounded-lg">
                        <p className="text-yellow-300">
                          📚 This content is currently being developed. Check back soon for detailed learning materials!
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          markAsCompleted(selectedModule);
                          setSelectedModule(null);
                        }}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        Mark as Complete
                      </button>
                      <button
                        onClick={() => toggleBookmark(selectedModule)}
                        className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                      >
                        {bookmarkedModules.includes(selectedModule) ? 'Remove Bookmark' : 'Bookmark'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}