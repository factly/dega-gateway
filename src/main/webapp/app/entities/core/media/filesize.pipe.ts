import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'degafilesize' })
export class FileSizePipe implements PipeTransform {
    private units: string[] = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];

    transform(bytes = 0, precision = 2): string {
        let result: string;
        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
            result = '?';
        } else {
            let unit = 0;

            while (bytes >= 1024) {
                bytes /= 1024;
                unit++;
            }

            result = bytes.toFixed(+precision) + ' ' + this.units[unit];
        }
        return result;
    }
}
