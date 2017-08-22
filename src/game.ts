import { IGame, IGameConfig } from './interfaces';

import { AuthTypes } from './auth-types';
import { GameUnit } from './game-unit';
import { kebabCase } from 'lodash';

export abstract class Game implements IGame {
  private name: string;
  private description: string;
  private id?: string;
  private creatorKey: string;
  private distributorKey: string;
  private gameUnits: GameUnit[];
  private authOptions: AuthTypes[];

  private logo?: string;

  constructor(settings: IGameConfig) {
    this.name = settings.name;
    this.description = settings.description;
    this.creatorKey = settings.creatorKey;

    this.id = settings.id || kebabCase(settings.name);

    this.creatorKey = settings.creatorKey || settings.distributorKey;
    this.distributorKey = this.distributorKey || settings.creatorKey;

    this.gameUnits = settings.gameUnits;
    this.authOptions = settings.authOptions;
  }

  public getName(): string {
    return this.name;
  }
  
  public getDescription(): string {
    return this.description;
  }

  public getId(): string {
    return this.id;
  }

  public getCreatorKey(): string {
    return this.creatorKey;
  }

  public getDistributorKey(): string {
    return this.distributorKey;
  }

  public getLogo(): string {
    return this.logo;
  }

  public authenticate() {}

  public authenticateWithLogin() {}

  public authenticateWithCode() {}
}
