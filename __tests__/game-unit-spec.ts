import { Match } from '../examples/units';
import { Game, GameUnit } from '../src';

const gameUnitInstance: GameUnit = new Match();

describe('GameUnit type', () => {
  test('getters', () => {
    expect(gameUnitInstance.getName()).toBe('Match');
    expect(gameUnitInstance.getDescription().length).toBeGreaterThan(0);
    expect(gameUnitInstance.getId()).toBe('match');
    expect(gameUnitInstance.getParameters().length).toBeGreaterThan(0);
  });

  test('static methods', () => {
    expect(Game.initType<GameUnit>(Match)[0]).toBeInstanceOf(GameUnit);
    expect(Game.initType<GameUnit>([Match])[0]).toBeInstanceOf(GameUnit);
  });

  test('revenue calculation', async () => {
    expect.assertions(3);

    await expect(gameUnitInstance.calculateRevenue()).resolves.toBeDefined();
    await expect(gameUnitInstance.calculateRevenue()).resolves.not.toBeNaN();
    await expect(
      gameUnitInstance.calculateRevenue()
    ).resolves.toBeGreaterThanOrEqual(0);
  });
});