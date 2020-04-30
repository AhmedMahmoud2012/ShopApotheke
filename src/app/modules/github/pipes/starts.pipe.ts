import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'starsPipe' })
export class StarsPipe implements PipeTransform {
    transform(value: number): string {
        let newValue = value.toString();
        if (value >= 1000) {
            newValue = `${(value / 1000).toFixed(1)}K`
        }
        return newValue;
    }
}