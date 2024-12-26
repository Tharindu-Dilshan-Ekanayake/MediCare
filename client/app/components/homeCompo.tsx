import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;  // Added URL for image
}

interface DayProps {
  date: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  onSelect: (date: number) => void;
}

const Day: React.FC<DayProps> = ({ date, isCurrentMonth, isSelected, onSelect }) => (
  <TouchableOpacity
    onPress={() => onSelect(date)}
    style={[
      styles.dayContainer,
      isSelected && styles.selectedDay,
      !isCurrentMonth && styles.otherMonthDay,
    ]}
  >
    <Text style={[styles.dayText, isSelected && styles.selectedDayText, !isCurrentMonth && styles.otherMonthDayText]}>
      {date}
    </Text>
  </TouchableOpacity>
);

const CombinedComponent = () => {
  // Health News states
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

 
  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category: 'health',
          apiKey: 'dfae5a03ee134d00891ce707f2058c29',
          language: 'en',
        },
      });
      const formattedArticles = response.data.articles.map((article: any) => ({
        id: article.url,
        title: article.title,
        description: article.description || 'No description available',
        url: article.url,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage || 'https://via.placeholder.com/150',  // Default placeholder image
      }));
      setArticles(formattedArticles);
      setFilteredArticles(formattedArticles.slice( 6, 11)); // Limit to 5 articles initially
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

  const renderArticle = ({ item, index }: { item: NewsArticle, index: number }) => {
    const backgroundColor = index % 2 === 0 ? '#298D80' : '#FFA500'; // Alternating colors
    const textColor = 'white';
    return (
      <View
        style={[styles.articleContainer, { backgroundColor: backgroundColor }]}>
        <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
        <View style={styles.textContainer}>
          <Text style={[styles.articleTitle, { color: textColor }]}>{item.title}</Text>
          
        </View>
      </View>
    );
  };

  // Calendar states
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const daysInPrevMonth = getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    const days: { date: number; isCurrentMonth: boolean }[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const changeMonth = (increment: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment));
  };

  return (
    <View className='flex flex-col h-full px-4'>
      {/* Calendar Section */}
      <View className=' h-1/3'>
        <View style={styles.calendarContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Text style={styles.headerButton}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <Text style={styles.headerButton}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {weekDays.map((day, index) => (
              <Text key={index} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysContainer}>
            {generateCalendarDays().map((day, index) => (
              <Day
                key={index}
                date={day.date}
                isCurrentMonth={day.isCurrentMonth}
                isSelected={selectedDate === day.date && day.isCurrentMonth}
                onSelect={(date) => setSelectedDate(day.isCurrentMonth ? date : null)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Health News Section */}
      <View className='h-[500px] pt-[40px] '>
        <Text className="my-2 text-xl font-bold text-start text-[#19191A] pb-1 ">News Update</Text>

        {error && <Text className="mb-4 text-center text-red-500">{error}</Text>}

        {loading ? (
          <ActivityIndicator size="large" color="#298D80" />
        ) : (
          <FlatList
            data={filteredArticles}
            keyExtractor={(item) => item.id}
            renderItem={renderArticle}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#298D80']} className='text-white' />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    height: 250,
    marginRight: 10,
  },
  articleImage: {
    width: 280,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  articleDescription: {
    marginTop: 5,
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  calendarContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    fontSize: 24,
    padding: 10,
    color: '#298D80',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#19191A',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    fontWeight: '600',
    color: '#19191A',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#19191A',
  },
  selectedDay: {
    backgroundColor: '#298D80',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  otherMonthDayText: {
    color: '#19191A',
  },
});

export default CombinedComponent;
