type Variables = { [key: string]: string | number | boolean };

/**
 * 格式化 prompt，替换其中的 {xx} 占位符
 * @param prompt 原始 prompt 字符串
 * @param variables 包含变量值的对象
 * @returns 格式化后的 prompt 字符串
 *
 * @example
 * const prompt = 'Hello, {name}! You are {age} years old.';
 * const variables = { name: 'Alice', age: 30 };
 *
 * const formattedPrompt = formatPrompt(prompt, variables);
 * console.log(formattedPrompt); // 输出: "Hello, Alice! You are 30 years old."
 */
export function formatPrompt(prompt: string, variables: Variables): string {
  return prompt.replace(/\{(\w+)\}/g, (match, key) => {
    if (key in variables) {
      return String(variables[key]);
    }
    return match; // 如果没有找到对应的变量，保留原始占位符
  });
}
