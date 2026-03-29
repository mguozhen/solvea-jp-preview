#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 批量编辑 SVG 文件
 * 1. 去掉最外层边框 #282828
 * 2. 将填充色 #575757 改成 currentColor
 */

class SVGBatchEditor {
  constructor(inputDir, outputDir = null) {
    this.inputDir = inputDir;
    this.outputDir = outputDir || inputDir; // 如果没有指定输出目录，则覆盖原文件
    this.processedCount = 0;
    this.errorCount = 0;
  }

  /**
   * 检查目录是否存在
   */
  checkDirectory(dir) {
    if (!fs.existsSync(dir)) {
      throw new Error(`目录不存在: ${dir}`);
    }
    if (!fs.statSync(dir).isDirectory()) {
      throw new Error(`路径不是目录: ${dir}`);
    }
  }

  /**
   * 获取目录下所有 SVG 文件
   */
  getSVGFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter((file) => path.extname(file).toLowerCase() === '.svg');
  }

  /**
   * 编辑 SVG 内容
   */
  editSVGContent(content) {
    let modifiedContent = content;
    let hasChanges = false;

    // 如果是完整的元素包含 stroke="#282828"，可能需要删除整个元素
    // 例如: <rect ... stroke="#282828" ... />
    const rectWithStrokePattern = /<rect[^>]*stroke=["']#282828["'][^>]*\/?>/gi;
    if (rectWithStrokePattern.test(modifiedContent)) {
      modifiedContent = modifiedContent.replace(rectWithStrokePattern, '');
      hasChanges = true;
    }

    // 将填充色 #575757 改成 currentColor
    const fillPattern = /fill=["']#(575757|4d4d4d)["']/gi;
    if (fillPattern.test(modifiedContent)) {
      modifiedContent = modifiedContent.replace(
        fillPattern,
        'fill="currentColor"',
      );
      hasChanges = true;
    }

    // 清理可能产生的多余空行
    if (hasChanges) {
      modifiedContent = modifiedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
    }

    return {
      content: modifiedContent,
      hasChanges,
    };
  }

  /**
   * 处理单个 SVG 文件
   */
  processSVGFile(filename) {
    const inputPath = path.join(this.inputDir, filename);
    const outputPath = path.join(this.outputDir, filename);

    try {
      // 读取文件内容
      const content = fs.readFileSync(inputPath, 'utf8');

      // 编辑内容
      const { content: modifiedContent, hasChanges } =
        this.editSVGContent(content);

      if (hasChanges) {
        // 确保输出目录存在
        if (
          this.outputDir !== this.inputDir &&
          !fs.existsSync(this.outputDir)
        ) {
          fs.mkdirSync(this.outputDir, { recursive: true });
        }

        // 写入修改后的内容
        fs.writeFileSync(outputPath, modifiedContent, 'utf8');
        console.log(`✅ 已处理: ${filename}`);
        this.processedCount++;
      } else {
        console.log(`⏭️  无需修改: ${filename}`);
      }
    } catch (error) {
      console.error(`❌ 处理失败 ${filename}:`, error.message);
      this.errorCount++;
    }
  }

  /**
   * 批量处理所有 SVG 文件
   */
  async processAll() {
    try {
      console.log(`🚀 开始批量处理 SVG 文件...`);
      console.log(`📁 输入目录: ${this.inputDir}`);
      console.log(`📁 输出目录: ${this.outputDir}`);
      console.log('');

      // 检查输入目录
      this.checkDirectory(this.inputDir);

      // 获取所有 SVG 文件
      const svgFiles = this.getSVGFiles(this.inputDir);

      if (svgFiles.length === 0) {
        console.log('⚠️  未找到 SVG 文件');
        return;
      }

      console.log(`📋 找到 ${svgFiles.length} 个 SVG 文件:`);
      svgFiles.forEach((file) => console.log(`   - ${file}`));
      console.log('');

      // 处理每个文件
      for (const file of svgFiles) {
        this.processSVGFile(file);
      }

      // 输出统计信息
      console.log('');
      console.log('📊 处理完成统计:');
      console.log(`   ✅ 成功处理: ${this.processedCount} 个文件`);
      console.log(`   ❌ 处理失败: ${this.errorCount} 个文件`);
      console.log(`   📁 总文件数: ${svgFiles.length} 个文件`);
    } catch (error) {
      console.error('❌ 批量处理失败:', error.message);
      process.exit(1);
    }
  }
}

/**
 * 命令行参数解析
 */
function parseArguments() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
📝 SVG 批量编辑工具

用法:
  node batch-edit-svg.js <输入目录> [输出目录]

参数:
  输入目录    包含 SVG 文件的目录路径
  输出目录    可选，修改后文件的输出目录（默认覆盖原文件）

功能:
  1. 去掉最外层边框 #282828
  2. 将填充色 #575757 改成 currentColor

示例:
  node batch-edit-svg.js ./public/svgs
  node batch-edit-svg.js ./public/svgs ./output/svgs
    `);
    process.exit(0);
  }

  const inputDir = args[0];
  const outputDir = args[1] || null;

  return { inputDir, outputDir };
}

/**
 * 主函数
 */
async function main() {
  try {
    const { inputDir, outputDir } = parseArguments();
    const editor = new SVGBatchEditor(inputDir, outputDir);
    await editor.processAll();
  } catch (error) {
    console.error('❌ 程序执行失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = SVGBatchEditor;
