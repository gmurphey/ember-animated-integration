import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { animationsSettled, setupAnimationTest, time } from 'ember-animated/test-support';
import hbs from 'htmlbars-inline-precompile';
import fade from 'ember-animated/transitions/fade';

module('Integration | animated-if', function(hooks) {
  setupRenderingTest(hooks);
  setupAnimationTest(hooks);

  test('it renders', async function(assert) {
    this.set('transition', fade);
    this.set('shouldShow', true);

    await render(hbs`
      {{unless this.shouldShow "The following text should be fading out now"}}
      <AnimatedContainer>
        {{#animated-if this.shouldShow use=this.transition}}
          <p>hello world</p>
        {{/animated-if}}
      </AnimatedContainer>
    `);

    await time.pause();

    this.set('shouldShow', false);

    await time.advance(400);
    await this.pauseTest();

    await time.runAtSpeed(1);
    await animationsSettled();

    assert.ok(true);
  });
});
