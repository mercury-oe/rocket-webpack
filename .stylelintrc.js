module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    // Base rules
    indentation: 2,
    'number-leading-zero': 'never',
    'string-quotes': 'double',
    'selector-max-id': 0,
    'selector-list-comma-newline-after': 'always',
    'rule-empty-line-before': ['always', { ignore: ['after-comment'] }],
    'comment-empty-line-before': ['always', { except: ['first-nested'] }],
    'block-opening-brace-space-before': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-no-duplicate-properties': true,
    'declaration-property-value-blacklist': { '/^border/': ['none'] },
    'at-rule-empty-line-before': [
      'always',
      { ignore: ['after-comment'], except: ['first-nested'] },
    ],
    'max-nesting-depth': [1, {
      ignore: ['pseudo-classes'],
      ignoreAtRules: ['\&\:\:\-'],
    }],
    'block-no-empty': true,
    'no-duplicate-selectors': true,

    // Order
    'order/order': [
      'declarations',
      {
        type: 'rule',
        selector: '^&:(before|after)',
      },
      {
        type: 'rule',
        selector: '^&:(hover|focus|active|disabled)',
      },
      {
        type: 'rule',
        selector: '^&:\\w',
      },
      {
        type: 'rule',
        selector: '^&--',
      },
      {
        type: 'rule',
        selector: '^&.',
      },
      {
        type: 'rule',
        selector: '^& .',
      },
      {
        type: 'rule',
        selector: '^.',
      },
      'rules',
    ],
    'order/properties-order': [
      [
        'display',

        'flex',
        'flex-direction',
        'justify-content',
        'align-items',
        'align-content',
        'flex-wrap',

        'position',
        'top',
        'right',
        'bottom',
        'left',

        'width',
        'max-width',
        'min-width',

        'height',
        'max-height',
        'min-height',

        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',

        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',

        'border',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-color',
        'border-radius',
        'border-style',

        'z-index',
        'opacity',
        'visibility',
        'user-select',
        'cursor-pointer',

        'font-family',
        'font-size',
        'font-weight',
        'font-style',
        'line-height',
        'text-align',
        'vertical-align',
        'text-decoration',
        'text-overflow',
        'white-space',

        'background',
        'background-color',
        'background-repeat',
        'background-image',

        'transform',

        'transition',
      ],
      {
        unspecified: 'bottom',
      },
    ],
  },
};
