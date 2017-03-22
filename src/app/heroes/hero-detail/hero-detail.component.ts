import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { HeroService } from '../hero.service';

import { Hero } from '../shared/hero.model';

import { slideInDownAnimation } from '../../animations';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [ slideInDownAnimation ]
})
export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  hero: Hero;
  
  constructor(
    private _heroService: HeroService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._route.params
      .switchMap((params: Params) => 
        this._heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  private goBack(): void {
    let heroId = this.hero ? this.hero.id : null;
    this._router.navigate(['/heroes', { id: heroId }]);
  }

  save(): void {
    this._heroService.update(this.hero)
      .then(() => this.goBack());
  }


}
