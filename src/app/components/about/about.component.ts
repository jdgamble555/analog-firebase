import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import type { load } from '../../pages/about.server';

@Component({
    selector: 'app-about',
    standalone: true,
    template: `
    @if (about(); as data) {
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
    about = toSignal(injectLoad<typeof load>(), { requireSync: true });
}
