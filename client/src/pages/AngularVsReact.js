import React from 'react';
import { Link } from 'react-router-dom';

function AngularVsReact() {
  return (
    <div className="page">
      <Link to="/" className="back-btn">← Back to Home</Link>

      <h2>⚛️ Q3 — Angular vs React</h2>

      <p>
        Both Angular and React are used to build modern frontend 
        web applications, but they differ significantly in 
        philosophy, structure, and usage.
      </p>

      <h3 style={{ marginBottom: '10px' }}>📊 Key Differences:</h3>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Angular</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Type</td>
            <td>Full MVC Framework</td>
            <td>UI Library only</td>
          </tr>
          <tr>
            <td>Made by</td>
            <td>Google</td>
            <td>Meta (Facebook)</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>TypeScript (required)</td>
            <td>JavaScript / JSX</td>
          </tr>
          <tr>
            <td>Data Binding</td>
            <td>Two-way</td>
            <td>One-way</td>
          </tr>
          <tr>
            <td>Routing</td>
            <td>Built-in</td>
            <td>Needs React Router</td>
          </tr>
          <tr>
            <td>HTTP Calls</td>
            <td>Built-in HttpClient</td>
            <td>Needs axios or fetch</td>
          </tr>
          <tr>
            <td>Learning Curve</td>
            <td>Steep</td>
            <td>Moderate</td>
          </tr>
          <tr>
            <td>Best For</td>
            <td>Large enterprise apps</td>
            <td>Flexible SPAs</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginBottom: '10px' }}>🅰️ Angular Example:</h3>
      <pre>{`
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: \`
    <h1>Hello, {{ name }}!</h1>
    <input [(ngModel)]="name" />
  \`
})
export class GreetingComponent {
  name: string = 'Student';
  // Two-way binding — model and view auto sync
}
      `}</pre>

      <h3 style={{ marginBottom: '10px' }}>⚛️ React Example:</h3>
      <pre>{`
import { useState } from 'react';

function Greeting() {
  const [name, setName] = useState('Student');
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
}

export default Greeting;
      `}</pre>

      <h3 style={{ marginBottom: '10px' }}>🤔 When to Choose Which?</h3>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Choose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Large enterprise app, big team</td>
            <td>✅ Angular</td>
          </tr>
          <tr>
            <td>Flexible SPA, startup project</td>
            <td>✅ React</td>
          </tr>
          <tr>
            <td>Need everything built in</td>
            <td>✅ Angular</td>
          </tr>
          <tr>
            <td>Want to choose your own tools</td>
            <td>✅ React</td>
          </tr>
          <tr>
            <td>Most in demand skill globally</td>
            <td>✅ React</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AngularVsReact;