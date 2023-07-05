import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent {

  selectedHero?: Hero;
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`Heroes Component: Selected Hero Is =${hero.id}`);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(response => this.heroes = response);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService
      .addHero({ name } as Hero)
      .subscribe(hero => { this.heroes.push(hero); });
  }

  delete(hero: Hero): void {

    if (!hero) return;
    this.heroes = this.heroes
      .filter(h => h !== hero);
    this.heroService
      .deleteHero(hero.id)
      .subscribe();
  }
}