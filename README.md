# 🏈 Sports Betting Odds Table App

A modern, dynamic sports betting odds comparison application built with Next.js and Tailwind CSS. This app allows users to search for football matches and view real-time odds from multiple bookmakers in a professional, dark-themed interface.

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Match Search**: Search by Match ID or team names with real-time suggestions
- **Live Countdown Timer**: Real-time countdown display for match start times
- **Professional UI**: Dark theme with yellow-orange odds highlighting
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 📊 Odds Display
- **Multiple Odds Types**: Support for 3Way Result, Home/Away, and other betting types
- **Bookmaker Comparison**: Compare odds across different bookmakers
- **Accordion Interface**: Expandable/collapsible sections for better organization
- **Real-time Updates**: Live odds data with automatic refresh

### 🎨 User Interface
- **Dark Theme**: Professional sports betting interface
- **Team Logos**: Circular badges with team initials
- **Interactive Elements**: Hover effects and smooth animations
- **Clean Typography**: Modern, readable fonts and spacing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd odds-table-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add your data file**
   - Place your `data.json` file in the `public/` directory
   - Ensure it follows the required JSON structure (see Data Format section)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Start searching for matches!

## 📁 Data Format

Your `data.json` file should follow this structure:

```json
{
  "status": 200,
  "data": [
    {
      "gid": "1000",
      "id": "1000",
      "matches": {
        "match": {
          "awayteam": {
            "id": "1006",
            "name": "Atlanta Braves"
          },
          "date": "01.09.2024",
          "id": "327667",
          "localteam": {
            "id": "1009",
            "name": "Philadelphia Phillies"
          },
          "odds": {
            "type": [
              {
                "bookmaker": [
                  {
                    "id": "15",
                    "name": "WilliamHill",
                    "odd": [
                      {
                        "name": "Home",
                        "us": "-122",
                        "value": "1.82"
                      },
                      {
                        "name": "Draw",
                        "us": "700",
                        "value": "8.00"
                      },
                      {
                        "name": "Away",
                        "us": "122",
                        "value": "2.22"
                      }
                    ]
                  }
                ],
                "id": "1",
                "value": "3Way Result"
              }
            ]
          }
        }
      }
    }
  ]
}
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
- **State Management**: React Hooks
- **Data**: JSON file-based storage

## 📱 Usage Guide

### Searching for Matches
1. Use the search bar at the top of the page
2. Type a Match ID (e.g., "1000") or team name (e.g., "Philadelphia")
3. Select from the dropdown suggestions
4. View the match details and odds

### Viewing Odds
- **Match Header**: Shows countdown timer, team names, and match time
- **Odds Sections**: Each betting type has its own expandable section
- **Odds Values**: Yellow-orange numbers show the current odds
- **Accordion**: Click section headers to expand/collapse

### Features
- **Real-time Countdown**: Timer updates every second
- **Responsive Tables**: Scroll horizontally on mobile devices
- **Interactive UI**: Hover effects and smooth transitions

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Dark theme colors in the component classes
- Typography and spacing

### Data Structure
Modify the data parsing logic in `src/app/page.js` to match your data format:
- Update the `useEffect` hooks for data loading
- Modify the filtering logic for search
- Adjust the table rendering for different odds structures

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Build command: `npm run build`
- **AWS Amplify**: Follow Next.js deployment guide
- **Docker**: Use the provided Dockerfile

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests (if configured)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Data not loading?**
- Ensure `data.json` is in the `public/` directory
- Check the JSON format matches the required structure
- Verify the file is accessible via `/data.json` URL

**Styling issues?**
- Make sure Tailwind CSS is properly installed
- Check that all CSS classes are being applied
- Verify the build process is working correctly

**Search not working?**
- Check the data structure matches the expected format
- Verify team names and IDs are present in the data
- Check browser console for any JavaScript errors

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Open an issue on GitHub with detailed information

## 🔮 Future Enhancements

- [ ] Real-time API integration
- [ ] User authentication
- [ ] Favorite matches functionality
- [ ] Advanced filtering options
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Export functionality

---

**Built with ❤️ using Next.js and Tailwind CSS**
