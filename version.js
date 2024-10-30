const fs = require("fs").promises;
const path = require("path");

async function updatePackageVersions() {
  const packagesDir = path.join(process.cwd(), "packages");

  try {
    const packages = await fs.readdir(packagesDir);

    for (const pkg of packages) {
      const packageJsonPath = path.join(packagesDir, pkg, "package.json");

      try {
        // Read and parse package.json
        const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(packageJsonContent);

        if (packageJson.version) {
          // Split version into parts
          const [major, minor, patch] = packageJson.version
            .split(".")
            .map(Number);

          // Increment patch version
          const newVersion = `${major}.${minor}.${patch + 1}`;
          packageJson.version = newVersion;

          // Write updated package.json
          await fs.writeFile(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2)
          );
          console.log(`Updated ${packageJsonPath} to version ${newVersion}`);
        } else {
          console.log(`Skipping ${packageJsonPath}: No version field found`);
        }
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log(
            `No package.json found in ${path.join(packagesDir, pkg)}`
          );
        } else {
          console.error(`Error processing ${packageJsonPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Error reading packages directory:", error);
  }
}

updatePackageVersions();
