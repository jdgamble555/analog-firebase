import { Component } from '@angular/core';
import { AboutDoc } from './about.resolver';
import { injectResolver } from '@lib/utils';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [AsyncPipe],
    template: `
    @if (about | async; as data) {
    <div class="flex items-center justify-center my-5">
        <div class="border w-[400px] p-5 flex flex-col gap-3">
            <h1 class="text-3xl font-semibold">{{ data.name }}</h1>
            <p>{{ data.description }}</p>
        </div>
    </div>
    }
    `
})
export default class AboutComponent {
    about = injectResolver<AboutDoc>('data');
}