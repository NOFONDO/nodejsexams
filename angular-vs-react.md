# Q3 — Angular vs React

## Key Differences

| Feature | Angular | React |
|---|---|---|
| Type | Full MVC Framework | UI Library only |
| Made by | Google | Meta (Facebook) |
| Language | TypeScript (required) | JavaScript / JSX |
| Data binding | Two-way | One-way |
| Routing | Built-in | Needs React Router |
| Best for | Large enterprise apps | Flexible SPAs |

## Angular Example
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `<h1>Hello, {{ name }}!</h1>
             <input [(ngModel)]="name" />`
})
export class GreetingComponent {
  name: string = 'Student';
}
```

## React Example
```javascript
import { useState } from 'react';

function Greeting() {
  const [name, setName] = useState('Student');
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

export default Greeting;
```

## When to choose which?
- **Angular** — Large team, enterprise app, need everything built in
- **React** — Flexible project, startup, want to choose your own tools