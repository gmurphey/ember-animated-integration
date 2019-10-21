import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { animationsSettled, TimeControl } from 'ember-animated/test-support';
import hbs from 'htmlbars-inline-precompile';
import fade from 'ember-animated/transitions/fade';

module('Integration | animated-if', function(hooks) {
  let time;

  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    time = new TimeControl();
  });

  test('it renders', async function(assert) {
    this.set('transition', fade);
    this.set('items', ['foo', 'bar', 'buzz']);

    await render(hbs`
      <AnimatedContainer>
        {{#animated-if this.items.length use=this.transition}}
          <p>hello world</p>
        {{/animated-if}}
      </AnimatedContainer>
    `);

    await time.pause();
    this.set('items', []);

    await time.advance(400);
    await this.pauseTest();
    await time.runAtSpeed(1);

    await animationsSettled();

    assert.ok(true);
  });
});
