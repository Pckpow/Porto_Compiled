import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load datasets
@st.cache
def load_data():
    day_data = pd.read_csv('day_data.csv')
    hour_data = pd.read_csv('hour_data.csv')

    day_data['dteday'] = pd.to_datetime(day_data['dteday'])
    hour_data['dteday'] = pd.to_datetime(hour_data['dteday'])
    
    # Map weather conditions
    weather_labels = {1: 'Clear/Few clouds', 2: 'Mist/Cloudy', 3: 'Light Snow/Light Rain', 4: 'Heavy Rain/Snow'}
    day_data['weather_label'] = day_data['weathersit'].map(weather_labels)
    hour_data['weather_label'] = hour_data['weathersit'].map(weather_labels)
    
    return day_data, hour_data

# Load the data
day_data, hour_data = load_data()

# Streamlit Dashboard Layout
st.title("Bike Sharing Data Analysis Dashboard")
st.markdown("""
This dashboard provides insights into the bike sharing system, focusing on how weather conditions, seasonal trends, and time-of-day patterns affect bike rentals. It addresses two business questions:
1. How do weather conditions impact bike rentals?
2. Can we predict bike rentals based on seasonal and temporal factors?
""")

# Sidebar Filters
st.sidebar.header("Filter Data")
time_frame = st.sidebar.radio("Select Time Frame", ("Daily", "Hourly"))

# Get unique weather conditions from the data
weather_conditions = day_data['weather_label'].unique() if time_frame == "Daily" else hour_data['weather_label'].unique()

# Ensure the selection includes "Heavy Rain/Snow"
weather_condition = st.sidebar.multiselect("Select Weather Condition", weather_conditions, default=weather_conditions)

# Data Selection
if time_frame == "Daily":
    filtered_data = day_data[day_data['weather_label'].isin(weather_condition)]
else:
    filtered_data = hour_data[hour_data['weather_label'].isin(weather_condition)]

# Show Dataset if Checkbox is Selected
if st.sidebar.checkbox("Show Raw Data", False):
    st.subheader(f"{time_frame} Data")
    st.write(filtered_data)

# Correlation Analysis (First Business Question)
st.subheader("Correlation Analysis")
st.markdown("**Correlation between Weather Factors and Bike Rentals**")

if time_frame == "Daily":
    corr_data = filtered_data[['temp', 'atemp', 'hum', 'windspeed', 'cnt']].corr()
else:
    corr_data = filtered_data[['temp', 'atemp', 'hum', 'windspeed', 'cnt']].corr()

fig, ax = plt.subplots()
sns.heatmap(corr_data, annot=True, cmap='coolwarm', ax=ax)
st.pyplot(fig)

# Weather Impact on Bike Rentals (First Business Question)
st.subheader("Impact of Weather on Bike Rentals")
st.markdown("**Average Bike Rentals by Weather Condition**")

if time_frame == "Daily":
    weather_rentals = filtered_data.groupby('weather_label')['cnt'].mean()
else:
    weather_rentals = filtered_data.groupby('weather_label')['cnt'].mean()

fig, ax = plt.subplots()
weather_rentals.plot(kind='bar', color='skyblue', ax=ax)
ax.set_title("Average Bike Rentals by Weather Condition")
ax.set_xlabel("Weather Condition")
ax.set_ylabel("Average Total Rentals")
st.pyplot(fig)

# **Seasonal and Temporal Analysis (Second Business Question)**

st.subheader("Seasonal and Temporal Patterns (Predicting Bike Rentals)")
st.markdown("**1. Average Bike Rentals by Season**")

if time_frame == "Daily":
    season_rentals = filtered_data.groupby('season')['cnt'].mean()
else:
    season_rentals = filtered_data.groupby('season')['cnt'].mean()

fig, ax = plt.subplots()
season_rentals.plot(kind='bar', color='purple', ax=ax)
ax.set_title("Average Bike Rentals by Season")
ax.set_xlabel("Season (1:Spring, 2:Summer, 3:Fall, 4:Winter)")
ax.set_ylabel("Average Rentals")
st.pyplot(fig)

# Time of Day Analysis (only for hourly data)
if time_frame == "Hourly":
    st.subheader("2. Bike Rentals by Time of Day")
    st.markdown("**Average Bike Rentals by Time Segment (Morning, Afternoon, Evening, Night)**")

    # Segment time of day
    def time_of_day(hour):
        if 5 <= hour < 12:
            return 'Morning'
        elif 12 <= hour < 17:
            return 'Afternoon'
        elif 17 <= hour < 21:
            return 'Evening'
        else:
            return 'Night'

    filtered_data['time_segment'] = filtered_data['hr'].apply(time_of_day)
    time_segment_rentals = filtered_data.groupby('time_segment')['cnt'].mean()

    fig, ax = plt.subplots()
    time_segment_rentals.plot(kind='bar', color='lightgreen', ax=ax)
    ax.set_title("Average Bike Rentals by Time of Day")
    ax.set_xlabel("Time Segment")
    ax.set_ylabel("Average Rentals")
    st.pyplot(fig)

# Weekday vs Weekend Analysis (Predicting Rentals)
st.subheader("3. Bike Rentals by Weekday")
st.markdown("**Average Bike Rentals on Weekdays vs Weekends**")

if time_frame == "Daily":
    weekday_rentals = filtered_data.groupby('weekday')['cnt'].mean()
else:
    weekday_rentals = filtered_data.groupby('weekday')['cnt'].mean()

fig, ax = plt.subplots()
weekday_rentals.plot(kind='bar', color='orange', ax=ax)
ax.set_title("Average Bike Rentals by Weekday")
ax.set_xlabel("Weekday (0 = Sunday, 6 = Saturday)")
ax.set_ylabel("Average Rentals")
st.pyplot(fig)
