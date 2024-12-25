import { View, Text, TextInput, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

const HealthNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const API_KEY = 'YOUR_NEWS_API_KEY'; // Replace with your News API key

  const fetchNews = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category: 'health', // Fetch health-related news
          apiKey: 'dfae5a03ee134d00891ce707f2058c29', // Include your API key here
          language: 'en', // English articles
        },
      });

      const formattedArticles = response.data.articles.map((article: any) => ({
        id: article.url, // Use URL as unique id
        title: article.title,
        description: article.description || 'No description available',
        url: article.url,
        publishedAt: article.publishedAt,
      }));

      setArticles(formattedArticles);
      setFilteredArticles(formattedArticles.slice(4, 10)); // Limit to 5 articles initially
    } catch (error) {
      console.error('Error fetching health news:', error);
      setError('Failed to fetch health news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderArticle = ({ item, index }: { item: NewsArticle; index: number }) => {
    const backgroundColor = index % 2 === 0 ? 'bg-[#298D80]' : 'bg-orange-500'; // Alternate color
    const textColor = 'text-white';

    return (
      <View
        className={`${backgroundColor} h-[200px] w-[300px] mr-5 p-4 rounded-lg justify-center`}
      >
        <Text className={`text-lg font-bold ${textColor}`}>{item.title}</Text>
        <Text className={`mt-2 ${textColor}`}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 p-2 rounded-lg ">
      <Text className="my-2 text-2xl font-bold text-center text-[#298D80]">Health News</Text>

     

      {error && <Text className="mb-4 text-center text-red-500">{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#298D80" />
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id}
          renderItem={renderArticle}
          horizontal={true} // Horizontal scroll
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#298D80']}
            />
          }
        />
      )}
    </View>
  );
};

export default HealthNews;
