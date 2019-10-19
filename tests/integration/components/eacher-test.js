import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { setupAnimationTest, animationsSettled, time } from 'ember-animated/test-support';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | eacher', function(hooks) {
  setupRenderingTest(hooks);
  setupAnimationTest(hooks);

  test('it renders', async function(assert) {
    this.set('items', ['foo', 'bar', 'buzz']);

    await time.pause();

    await render(hbs`
      <Eacher @items={{this.items}}/>
    `);

    this.set('items', ['foo', 'bar']);

    await time.advance(400);
    await this.pauseTest();

    time.runAtSpeed(1);

    await animationsSettled();

    assert.dom('[data-item]').exists({ count: 2 });
  });
});
