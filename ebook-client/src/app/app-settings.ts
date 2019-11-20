export class AppSettings {
    public static BACKEND_URL() {
        return 'http://' + window.location.hostname + ':8082/';
    }
}