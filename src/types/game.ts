import { IAuthCode, IAuthResult, IGame, IGameConfig } from '../interfaces';

import { kebabCase } from 'lodash';
import { AuthTypes } from '../enums';
import { GameUnit } from './game-unit';

export abstract class Game implements IGame {
  public static initType<T>(unitArray: any, ...units: T[]): T[] {
    if (Array.isArray(unitArray)) {
      return Game.initType.apply(this, unitArray);
    }

    const fullArray: T[] = units || [];
    fullArray.unshift(unitArray);

    return fullArray.map((typeInstance: any) => new typeInstance());
  }

  private readonly name: string;
  private readonly description: string;
  private readonly id?: string;
  private readonly developerKey: string;
  private readonly developerSecret: string;
  private readonly gameUnits: GameUnit[];
  private readonly authTypes: AuthTypes[];

  private logo?: string;

  private defaultAuthOption: AuthTypes;

  constructor(settings: IGameConfig) {
    this.name = settings.name;
    this.description = settings.description;
    this.developerKey = settings.developerKey;

    this.id = settings.id || kebabCase(settings.name);

    this.developerKey = settings.developerKey;
    this.developerSecret = settings.developerSecret;

    this.gameUnits = settings.gameUnits || [];
    this.authTypes = settings.authTypes || [];

    this.defaultAuthOption = this.authTypes[0];
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

  public getDeveloperKey(): string {
    return this.developerKey;
  }

  public getDeveloperSecret(): string {
    return this.developerSecret;
  }

  public getGameUnits(): GameUnit[] {
    return this.gameUnits;
  }

  public getAuthTypes(): AuthTypes[] {
    return this.authTypes;
  }

  public getLogo(): string {
    return this.logo;
  }

  public getDefaultAuthType(): AuthTypes {
    return this.authTypes[0];
  }

  public setDefaultAuthType(type: AuthTypes): void {
    const index = this.authTypes.indexOf(type);
    this.authTypes.splice(index, 1);
    this.authTypes.unshift(1);
  }

  public authenticate(
    authType: AuthTypes = this.getDefaultAuthType()
  ): Promise<IAuthResult | IAuthCode> {
    switch (authType) {
      case AuthTypes.LOGIN:
        return this.authenticateWithLogin();
      case AuthTypes.CODE:
        return this.authenticateWithCode();
    }
  }

  protected abstract authenticateWithLogin(): Promise<IAuthResult>;

  protected abstract authenticateWithCode(): Promise<IAuthResult>;
}
