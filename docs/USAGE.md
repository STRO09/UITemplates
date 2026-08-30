use server side fetches when the data is needed to construct the page. 

Example:

// app/dashboard/page.jsx

import DashboardClient from "./DashboardClient";
import { getDashboard } from "@/api/server/dashboard";

export default async function DashboardPage() {
  const dashboard = await getDashboard();

  return <DashboardClient dashboard={dashboard} />;
}

This is good for:

initial dashboard data
user profile
initial table data
initial pagination page
server-authenticated data
SEO-sensitive content
data required for the page to render meaningfully


use client side fetches when page is already initialized, interacting and some action is taken afterwards.

For example:

Dashboard already loaded
        ↓
User clicks "Delete"
        ↓
Browser
        ↓
apiClient.delete(...)
        ↓
Backend
        ↓
Update UI

For pagination, 
Depends.

Pagination represented in the URL
/dashboard/users?page=2

I'd generally make this a Server Component fetch.

/dashboard/users?page=1
        ↓
server fetch
        ↓
render page 1

/dashboard/users?page=2
        ↓
server fetch
        ↓
render page 2

That's particularly nice because the URL represents application state.

Pagination entirely inside an already-loaded UI
Dashboard loaded
        ↓
click "Next"
        ↓
client fetch
        ↓
replace table rows

That's CSR-style interaction.

Both are valid.

The question is whether changing the page should be treated as navigation or merely an interaction inside the current page.


and the structure for client side pages can directly be kanbanboard/page.jsx
use CSR for pages that wont benefit from any pre rendered content from server like a blank canvas, calendar loading with its events loaded afterwards, etc.

Static Site Generation

The HTML is generated ahead of time, rather than every time a user requests it.

Think:

BUILD TIME
    ↓
Next.js generates HTML
    ↓
stored/distributed
    ↓
User requests page
    ↓
already-generated HTML

Perfect for:

/
/about
/pricing
/features
/blog/some-article

where the content doesn't change constantly.

And yes:

Marketing pages are excellent candidates for SSG.

SEO is one reason, but SEO isn't the definition of SSG.

SSG's fundamental property is:

The HTML can be generated without knowing who the user is or what is happening right now.