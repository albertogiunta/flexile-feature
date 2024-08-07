### Gumroad Application - Software Engineering Freelance Position - Open Challenge

**Author**: Alberto Giunta

**Object**: Flexile - Public Portfolio page + Edit Modal

**Live URL**: https://ag-flexile-public-portfolio.vercel.app/f/alb

**Goal of this feature:**

- _for flexile talents_: they can flex a unique, custom and no BS flexile shortlink with their portfolio and contact info. Them being part of the Flexile community should feel elitarian for both the talent and the company looking at the portfolio. They can sell services directly from their public page, and ideally the whole monetization flow should go through Flexile itself.
- _for companies_: to meet the Flexile brand and product if they're not Flexile clients yet, and to have a trustworthy source of info regarding the past history and work achievements of a certain freelancer.

**Stack:**

- Astro
- Tailwind
- React

**Workflow:**

- Cursor
- Claude 3.5 Sonnet
- ~3 hours total (it could have been less tho: I did some experimentation and styling that took some time + didn't want to rush it)

**Notes:**

- I tried to reach a look&feel that felt as much like Flexile as I could make it, especially in the public page UI
- There's no real DB attached to the page and the "Save Changes" button in the Edit modal is not implemented. I didn't think it was too useful to showcase as it'd have been a single POST request. I focused more on making it feel "at home" than go full circle with the functionality.
- I used [astro.build](https://astro.build/) as a meta framework, as it allows to write pages and components each in the most sensical way for their use case and I thought it might have been interesting for you to see what it could look like:
  - the public page is static, SSR and written in pure html
  - the modal is in React and rendered on the client

![image](https://github.com/user-attachments/assets/409ba0bb-82e0-4c36-b844-c005d95e6161)
![CleanShot 2024-08-07 at 17 37 37](https://github.com/user-attachments/assets/d88a4cbd-5046-4755-b317-91427a47d534)
