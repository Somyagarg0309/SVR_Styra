
# SVR_Styra

# Styra – Unified Fashion Shopping Platform

Styra is a next-generation mobile application that simplifies online fashion shopping in India. By aggregating products from multiple marketplaces and combining them with AI-driven styling assistance, Styra allows users to browse, compare, and curate complete outfits effortlessly , all in one place.

## Problem Statement

Online fashion shopping in India is fragmented and overwhelming. Shoppers jump across multiple apps like Myntra, Ajio, Meesho, Flipkart etc..just to find complementary items for a single outfit.

This leads to:

- Scattered browsing across multiple platforms
- Incomplete styling due to missing accessories or makeup suggestions
- Time-consuming comparisons and decisions
- Decision fatigue, causing high abandonment rates

> 76% of Indian consumers feel overwhelmed by online choices, contributing to cart abandonment rates of 42%.

## Solution

Styra brings unified fashion discovery to one app:

- Aggregates products from top fashion marketplaces
- AI-powered chatbot stylist for personalized outfit suggestions
- Unified cart & wishlist across multiple platforms
- Fast search with asynchronous multi-site fetching
- Secure Google OAuth authentication
- Optimized for mobile with a smooth and intuitive UI

With Styra, shoppers make confident, stylish, and time-efficient fashion decisions.

## Key Features

### Unified Product Aggregation
Browse dresses, shoes, jewelry, and makeup from multiple platforms ,all in one interface.

### Personalized User Profiles
User preferences such as color, fit, style, and fashion goals help deliver tailored recommendations.

### AI-Powered Chatbot Stylist
Get interactive suggestions for:
- Complete outfits
- Occasion-based looks
- Accessories, footwear, and makeup

### Asynchronous Multi-Site Search
Fast product aggregation from various marketplaces with real-time updates.

### Unified Cart & Wishlist
Save, compare, and organize products from different platforms seamlessly.

### Mobile-Optimized UI
Built with a modern, responsive interface ideal for mobile shopping.

## Technology Stack

**Frontend:** React Native, TypeScript, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Authentication:** Google OAuth  
**APIs:** Myntra, Meesho, Flipkart  
**Cloud Deployment:** Render  
**AI Integration:** Fashion recommendation chatbot

## Setup Instructions

### Frontend Setup
```bash
##Add Keys wherever required in the frontend folder and then follow the steps
git clone https://github.com/YOUR_USERNAME/Styra.git
cd SVR_Styra/frontend
npm install
npx expo start
```

### Backend Setup
```bash
cd ../backend

Create a .env file with the following content:
PORT=                     # e.g., 5000
GOOGLE_API_KEY=            # API key for Google services
GROQ_API_KEY=              # API key for GROQ queries
IMG_TO_TXT_API=            # API key for image-to-text conversion
GOOGLE_CLIENT_ID=          # Google OAuth client ID
GOOGLE_CLIENT_SECRET=      # Google OAuth client secret
BACKEND_URL=               # Optional backend base URL

Install dependencies and start the server:
npm install
npm start

```

## Future Scope

- Virtual try-on using AI  
- Enhanced product discovery with Explore API  
- Price comparison & deal alerts  
- Community features, lookbooks & seasonal trends  
- Web and desktop app versions  
- Data-driven personalization algorithms  

---

## Contributions

Pull requests and feature suggestions are welcome!  
Feel free to open an issue for any bugs or suggestions for improvement.





