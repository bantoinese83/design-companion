# 🏗️ Architectural Design Companion

## ✨ Features

- 🤖 **AI-Powered Analysis**: Google Gemini integration for intelligent architectural analysis
- 🧠 **Neuroarchitecture Grounding**: Research-backed insights from indexed knowledge base
- 🎨 **Cinematic UI**: Modern, minimalist design with smooth animations
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🔧 **Developer Experience**: Comprehensive tooling, error boundaries, and performance monitoring
- 🎯 **Type Safety**: Full TypeScript implementation with strict mode
- 🚀 **Performance Optimized**: React.memo, lazy loading, and code splitting
- 🛡️ **Error Handling**: Robust error boundaries and user-friendly error messages
- 📊 **Development Tools**: Built-in performance metrics and debugging tools

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bantoinese83/design-companion.git
   cd architectural-design-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your Gemini API key**

   **Option 1: Automated Setup (Recommended)**
   ```bash
   # Run the setup script
   ./setup-api-key.sh
   ```

   **Option 2: Manual Setup**
   ```bash
   # Create a .env.local file in the project root
   touch .env.local

   # Add your Gemini API key (get it from https://ai.google.dev/gemini-api/docs/api-key)
   # Replace YOUR_ACTUAL_API_KEY with your real key
   echo "GEMINI_API_KEY=YOUR_ACTUAL_API_KEY" > .env.local
   ```

   **Important**: Make sure to use your actual Gemini API key, not a backend environment variable. This frontend application needs direct access to the API key.

   If you see an "API Key Setup" screen, it means the GEMINI_API_KEY environment variable is not properly configured. Follow the steps above and restart your development server.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── AnalysisResults.tsx
│   ├── ApiKeySetup.tsx
│   ├── CitationsList.tsx
│   ├── DevTools.tsx     # Development debugging tools
│   ├── LandingPage.tsx
│   ├── LibraryModal.tsx
│   ├── MainApp.tsx
│   └── MessageBubble.tsx
├── contexts/            # React Context providers
│   └── AppContext.tsx
├── hooks/               # Custom React hooks
│   ├── useAsync.ts
│   ├── useAuth.ts
│   ├── useLibrary.ts
│   ├── useLocalStorage.ts
│   ├── useSessions.ts
│   └── useUI.ts
├── lib/                 # Utilities and configuration
│   ├── animations.ts
│   ├── constants.ts     # Centralized constants (no magic numbers)
│   ├── design-tokens.ts
│   ├── error-messages.ts
│   ├── icons.ts         # Centralized icon system
│   ├── logger.ts        # Structured logging
│   └── utils.ts
├── services/            # API services
│   └── geminiService.ts
├── types/               # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   ├── chat.ts
│   ├── components.ts
│   ├── context.ts
│   ├── enums.ts
│   ├── errors.ts
│   ├── hooks.ts
│   ├── index.ts         # Main types export
│   ├── library.ts
│   ├── ui.ts
│   └── utils.ts
└── index.tsx            # Application entry point
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Quality Assurance
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking

# Quality Gates
npm run quality      # Run all quality checks
npm run quality:fix  # Fix all auto-fixable issues
npm run quality:full # Run quality checks + unused dependency detection

# Testing
npm run test         # Run tests (when implemented)
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Development Tools

The application includes built-in development tools accessible in development mode:

1. **DevTools Panel**: Click the brain icon (🧠) in the bottom-left corner to access:
   - Real-time performance metrics
   - Render count tracking
   - Memory usage monitoring
   - Component render timing

2. **Enhanced Error Boundaries**: Comprehensive error handling with:
   - Error categorization (network, auth, validation, runtime)
   - Severity levels (low, medium, high, critical)
   - Recovery suggestions
   - Detailed error reporting

3. **Structured Logging**: All logs include context and are structured for easy debugging.

### Code Quality Standards

This project follows strict code quality standards:

- **TypeScript Strict Mode**: Enabled for maximum type safety
- **ESLint**: Comprehensive linting rules with React and TypeScript support
- **Prettier**: Consistent code formatting
- **Knip**: Unused dependency detection
- **SOLID Principles**: Clean architecture patterns
- **DRY/KISS**: No code duplication, simple solutions

## 🏗️ Architecture

### Design Principles

1. **Separation of Concerns**: Business logic, UI, and data access are clearly separated
2. **Single Responsibility**: Each component and hook has one clear purpose
3. **Dependency Injection**: Context provides dependencies to components
4. **Error Boundaries**: Graceful error handling at multiple levels
5. **Performance First**: Memoization, lazy loading, and code splitting

### State Management

- **Local State**: React hooks for component-specific state
- **Global State**: React Context for app-wide state
- **Persistent State**: localStorage with type-safe utilities
- **Server State**: Custom hooks for API interactions

### Component Patterns

- **Container/Presentational**: Separation of logic and presentation
- **Compound Components**: Related components grouped together
- **Render Props**: Flexible component composition
- **Custom Hooks**: Reusable logic extraction

## 🎨 Design System

### Centralized Design Tokens

The application uses a comprehensive design token system:

```typescript
// Colors, spacing, typography, shadows, borders, animations
import { UI, BUSINESS } from '@/lib/constants';
```

### Icon System

All icons are centralized and consistently sized:

```typescript
import { Icons } from '@/lib/icons';

// Usage
<Icons.brain size={24} />
<Icons.message className="text-blue-500" />
```

### Responsive Design

- Mobile-first approach
- Consistent breakpoints
- Touch-friendly interactions
- Accessible design patterns

## 🔧 Configuration

### Environment Variables

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
NODE_ENV=development
VITE_APP_TITLE=Architectural Design Companion
```

### Build Configuration

- **Vite**: Fast build tool with HMR
- **Tailwind CSS v4**: Utility-first CSS framework
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Build

```bash
npm run build
npm run preview
```

## 🤝 Contributing

### Development Workflow

1. **Fork and Clone**
2. **Create Feature Branch**: \`git checkout -b feature/your-feature\`
3. **Make Changes**: Follow code quality standards
4. **Run Quality Checks**: \`npm run quality\`
5. **Test Changes**: Manual testing and automated tests
6. **Commit**: \`git commit -m "feat: add your feature"\`
7. **Push**: \`git push origin feature/your-feature\`
8. **Create PR**: With detailed description

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Keep components small and focused
- Use custom hooks for reusable logic

## 📈 Performance

### Optimizations Implemented

- **React.memo**: Prevents unnecessary re-renders
- **useMemo/useCallback**: Memoizes expensive calculations
- **Lazy Loading**: Code splitting for routes and heavy components
- **Image Optimization**: Efficient image handling
- **Bundle Analysis**: Optimized chunk splitting

### Performance Monitoring

Development tools provide real-time performance metrics:
- Render count tracking
- Memory usage monitoring
- Component render timing
- Bundle size analysis

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Run \`npm run quality:fix\` to auto-fix issues
2. **Type Errors**: Check TypeScript strict mode compliance
3. **Performance Issues**: Use DevTools to identify bottlenecks
4. **API Errors**: Verify GEMINI_API_KEY is set correctly

### Debug Mode

Enable debug logging:
```typescript
import { logger } from '@/lib/logger';
logger.setLevel('debug');
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the analysis
- Lucide React for the icon system
- Tailwind CSS for styling utilities
- React ecosystem for robust development tools

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and modern web technologies</p>
  <p>
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>
