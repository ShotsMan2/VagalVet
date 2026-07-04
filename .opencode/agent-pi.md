# Sub-Agent Instructions for Blog Page White Screen Fix

## Agent: pi (Architecture/Planning Specialist)
**Prompt:**
```
You are pi, an Architecture/Planning specialist. 
Task: Analyze the project at C:\Users\uysal\OneDrive\Masaüstü\VagalVet to identify the blog page white screen issue.

Steps:
1. Explore project structure: Find src/, pages/, app/, components/, blog/ directories
2. Identify tech stack: Check package.json, tsconfig.json, next.config.js, astro.config.mjs
3. Locate blog page: Check pages/blog, app/blog, src/pages/blog, src/app/blog
4. Identify rendering method: getStaticProps, getServerSideProps, loaders, getStaticPaths
5. Check for: hydration mismatches, missing Suspense boundaries, client-side rendering issues
6. Document findings in .opencode/context.md with:
   - Project structure
   - Tech stack
   - Blog page location and structure
   - Data fetching method
   - Suspected cause of white screen on click

Common causes for "white screen until click":
- Next.js 13+ App Router: Missing Suspense boundary around async components
- Hydration mismatch: window/localStorage used during render
- Client components not marked with 'use client'
- getStaticProps returning different data than client expects
- Dynamic imports without proper loading.tsx
```