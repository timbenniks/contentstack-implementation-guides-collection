const { exec } = require("child_process").promises;
const fs = require("fs").promises;
const path = require("path");

async function publishPackages() {
  const packagesDir = path.join(process.cwd(), "packages");

  try {
    const packages = await fs.readdir(packagesDir);

    for (const pkg of packages) {
      const packagePath = path.join(packagesDir, pkg);
      const packageJsonPath = path.join(packagePath, "package.json");

      try {
        // Read and parse package.json
        const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(packageJsonContent);

        if (packageJson.repository && packageJson.repository.url) {
          console.log(`Pushing ${pkg}...`);
          try {
            await exec("git add .", { cwd: packagePath });
            await exec('git commit -m "Update package"', { cwd: packagePath });
            await exec("git push", { cwd: packagePath });
            console.log(`Successfully pushed ${pkg}`);
          } catch (error) {
            console.error(`Error pushing ${pkg}: ${error.message}`);
          }
        } else {
          console.log(`Skipping ${pkg}: No repository configured`);
        }
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log(`No package.json found in ${packagePath}`);
        } else {
          console.error(`Error processing ${packageJsonPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Error reading packages directory:", error);
  }
}

publishPackages();
