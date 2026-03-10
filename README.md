# docker-version-control
Implement docker service with version control.

## Docker and GitHub tags

Image version is driven by **git tags**. Use semantic tags (e.g. `v1.0.0`).

### Local

- **Version from git tag** (or `package.json` if no tag):
  ```bash
  npm run docker:version
  ```
- **Build image with that version** (also tags `latest`):
  ```bash
  npm run docker:build
  ```
- **Run a specific version with Compose**:
  ```bash
  # Windows PowerShell
  $env:IMAGE_TAG="1.0.0"; docker compose up -d
  # Linux/macOS
  IMAGE_TAG=1.0.0 docker compose up -d
  ```
- Default (no `IMAGE_TAG`) uses `latest`.

### Release flow

1. Tag and push:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. GitHub Actions builds and pushes the image to **GitHub Container Registry**:
   - `ghcr.io/<your-org>/docker-version-control:1.0.0`
   - `ghcr.io/<your-org>/docker-version-control:latest`
3. To use from GHCR:
   ```bash
   docker pull ghcr.io/<your-org>/docker-version-control:1.0.0
   ```
