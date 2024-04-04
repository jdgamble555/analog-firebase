import { Component, inject } from '@angular/core';
import { IndexComponent } from '../components/index/index.component';
import { ActivatedRoute } from '@angular/router';
import { AboutDoc, aboutResolver } from '../resolvers/about.resolver';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
    resolve: { data: aboutResolver }
};

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [IndexComponent],
    template: `
    @if (about) {
    <div class="flex items-center justify-center my-5">
        <div class="border w-[400px] p-5 flex flex-col gap-3">
            <h1 class="text-3xl font-semibold">{{ about.name }}</h1>
            <p>{{ about.description }}</p>
        </div>
    </div>
    }
    `
})
export default class AboutComponent {

    private route = inject(ActivatedRoute);

    about = this.route.snapshot.data['data'] as AboutDoc;
}