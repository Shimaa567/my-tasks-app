### My Tasks (Demo App)
#### Demos
- [Web App](https://mytasks.app.sourcya.io)
- [Android Build](https://github.com/sourcya/my-tasks-app/tree/main/APK)

#### What is inside?
- [Ionic Framework](https://ionicframework.com/)
- [React JS](https://reactjs.org/)
- [React Admin](https://marmelab.com/react-admin/)
- [Capacitor JS](https://capacitorjs.com)
- [Capacitor Resources](https://www.npmjs.com/package/capacitor-resources)

#### Backend
[Sourcya Connect](https://github.com/sourcya/connect)

#### Customize
- Write/Edit react-admin modules within the src/ra folder
- Customize your react-admin theme from src/ra/theme.tsx
- Change APIU to your [Sourcya Connect](https://github.com/sourcya/connect) backend uri in src/ra/service.tsx 
- Change icon and splash images from resources
- Change icon and favicon from public/assets/icon
- Edit short_name and name from public/manifest.json
- Edit <title></title> in public/index.html
- Edit appId and appName in capacitor.config.json
- Edit name in ionic.config.json

#### Run & Build
##### Development
- install node and npm
> requires root/administrator access
- install @ionic/cli
> requires root/administrator access
```
npm uninstall -g ionic
npm install -g @ionic/cli
```
- Run the project in development mode
```
ionic serve
```
##### Build for production
###### Web
```
ionic build --prod
```
On success the build directory will contain a production web build of the app

###### Android
> requires Linux machine & docker installed
```
sh build_android
```
On Success the APK directory will contain debug-app.apk
