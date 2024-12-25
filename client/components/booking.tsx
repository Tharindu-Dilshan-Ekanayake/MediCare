import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
    <Text style={[
      styles.dayText,
      isSelected && styles.selectedDayText,
      !isCurrentMonth && styles.otherMonthDayText,
    ]}>
      {date}
    </Text>
  </TouchableOpacity>
);

export default function Booking() {
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

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
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
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
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
            <Text key={index} style={styles.weekDay}>
              {day}
            </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#19191A',
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