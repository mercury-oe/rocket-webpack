const webpack = require('webpack');
const ImageminWebpackPlugin = require('imagemin-webpack');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const contextReplacement = () => ({
  plugins: [new webpack.ContextReplacementPlugin(/moment\/locale$/, /ru/)],
});

const imageOptimization = () => ({
  plugins: [
    new ImageminWebpackPlugin({
      imageminOptions: {
        plugins: [
          imageminMozjpeg({
            progressive: true,
            quality: 60,
          }),
          imageminPngquant({
            quality: 60,
          }),
          imageminSvgo(),
        ],
      },
    }),
    new ImageminWebpWebpackPlugin(),
  ],
});

const optimizeModules = () => ({
  optimization: {
    /** Минификация JavaScript */
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
    /** Останавливает эмит сборки при возникновении ошибки во время компиляции */
    noEmitOnErrors: true,
    /** Не добавляет в сборку пустые чанки */
    removeEmptyChunks: true,
    /** Объединяет идентичные чанки (которые содержат одинаковые модули) */
    mergeDuplicateChunks: true,
    /** Удаляет модуль из чанка, если этот модуль присутствует в родительском чанке */
    removeAvailableModules: true,
    /**
     * Определяет дочерние чанки у родительских чанков таким образом, что дочерний чанк
     * не грузится, если родительский уже загрузился
     */
    flagIncludedChunks: true,
    /** Определяет более часто-используемые модули, и формирует сборку меньшего размера
     occurrenceOrder: true,
     /** Анализирует dependency graph и пытается найти доступные для объединения модули. */
    concatenateModules: false,
    /**
     * Инструкция вебпаку определить экспорты для каждого модуля,
     * и в результате сгенерировать более эффективный код
     */
    providedExports: true,
    /**
     * Определяет только использованные экспорты. Помогает Dead Code Elimination минифификаторов
     * удалять неиспользованные экспорты
     */
    usedExports: true,
    /** Собирает зависимости более эффективно, если в package зависимости тоже стоит этот флаг */
    sideEffects: true,
    /** Конфигурация SplitChunksPlugin */
    splitChunks: {
      /** Режим разделения кода. По-умолчанию работает режим async. */
      chunks: 'async',
      /** Минимальный размер нового чанка для отделения */
      minSize: 30000,
      /** Максимальный размер нового чанка для отделения */
      maxSize: 0,
      /**
       * Минимальное количество чанков, которые зависят от модуля
       * перед отделением этого модуля в отдельный чанк
       */
      minChunks: 1,
      /**
       * Максимальное количество одновременных параллельных запросов чанков
       * для асинхронного сплит-поинта (динамический импорт)
       * Всегда предпочитаются чанки большего размера.
       */
      maxAsyncRequests: 5,
      /**
       * Максимальное количество одновременных параллельных запросов чанков на один entrypoint
       * Всегда предпочитаются чанки большего размера.
       */
      maxInitialRequests: 3,
      /** Символ-разделитель имени сплит-чанка (напр. vendors~main.js); */
      automaticNameDelimiter: '~',
      /** Определяет имя нового чанка */
      name: true,
      /**
       * По-умолчанию cacheGroups наследует от остальных опций splitChunks ↑.
       * Уникальные для cacheGroups только test, priority и reuseExistingChunk.
       * Ключ каждой кеш-группы определяет её имя.
       * По-умолчанию вебпак устанавливает две кеш-группы:
       */
      cacheGroups: {
        /** Дефолтная кеш-группа. Выносит все зависимости из node_nodules в чанк vendors. */
        vendors: {
          name: 'vendors',
          /** Перезаписанная опция */
          chunks: 'initial',
          /**
           * Выбирает модули, внесённые в данную кеш-группу
           */
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          /**
           * Дефолтная кеш-группа. Выносит любой модуль-зависимость в отдельный чанк default
           * при условии дублирования модуля-зависимости хотя-бы в двух чанках.
           */
          minChunks: 2,
          /**
           * Приоритет кеш-группы. Если модуль попадает сразу в несколько кеш-групп, то выбирется
           * кеш-группа с более высоким priority, или которая составляет чанк большего размера.
           * У дефолтных кеш-групп отрицательный приоритет,
           * поэтому кастомные кеш-группы приоритетнее (их priority 0 по-умолчанию).
           */
          priority: -20,
          /**
           * Если чанк содержит уже существующий отделённый чанк,
           * то используется этот уже существующий отделённый чанк вместо создания нового
           */
          reuseExistingChunk: true,
        },
      },
    },
    /** Выносит webpack runtime каждого entrypoint в отдельный чанк. */
    runtimeChunk: false,
  },
});

module.exports = {
  contextReplacement,
  imageOptimization,
  optimizeModules,
};
