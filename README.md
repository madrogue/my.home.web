# my.home.web

A React frontend and static server for the my.home project.

## Description
This project provides a React-based web interface and serves static files. It communicates with the my.home.api backend.

## Configuration

All runtime settings are in `config.json`:

- `port`: Port for the frontend server (default: 8080)
- `baseApiUrl`: URL for the backend API (default: http://localhost:8081)
- `externalPages`: Array of objects for mounting extra static folders. Each object should have:
  - `mount`: The URL path to mount the static folder (e.g., "/lists").
  - `path`: The filesystem path to the folder (e.g., "~/apps/lists"). `~` will be expanded to your home directory.
  
  Example:
  ```json
  "externalPages": [
    { "mount": "/lists", "path": "~/apps/lists" }
  ]
  ```

- `log`: Logging configuration. Example:
  ```json
  "log": {
    "type": "console",        // Only 'console' is currently supported
    "level": "debug",         // One of: 'debug', 'warning', 'error'
    "timestamps": true,        // (Optional) Include timestamps in logs
    "timestampFormat": "YYYY-MM-DD HH:mm:ss.SSS" // (Optional) Moment.js format string
  }
  ```
  - `type`: Logger type (currently only 'console')
  - `level`: Minimum log level to output
  - `timestamps`: If true, prepends timestamps to log messages
  - `timestampFormat`: Format for timestamps (uses moment.js)

## Usage
- Build frontend: `npm run build`
- Start server: `npm start`
- Run tests: `npm test`

---
MIT License
