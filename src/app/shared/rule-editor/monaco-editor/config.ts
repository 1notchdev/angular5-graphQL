import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';
declare var monaco: any;
export const monacoConfig: NgxMonacoEditorConfig = {
    onMonacoLoad: () => {
        const languageID = "indigo";
        monaco.languages.register({ id: languageID });
        // Register a tokens provider for the language
        monaco.languages.setMonarchTokensProvider('indigo', {
            tokenizer: {
                root: [
                    [/\s+with|of|in|and\s+/, "link"],
                    [/\+|-|=|\/|\*/, "operator"],
                    [/(?!with|of|in|and)[a-zA-Z0-9]+/, "property"],
                ]
            }
        });
        // Define a new theme that constains only rules that match this language
        monaco.editor.defineTheme('myCoolTheme', {
            base: 'vs',
            inherit: false,
            rules: [
                { token: 'link', foreground: 'df61a8', fontStyle: 'bold' },
                { token: 'operator', foreground: 'df61a8', fontStyle: 'bold' },
                { token: 'property', foreground: '265fde' },
                { token: 'aspect', foreground: '0000FF' },
            ]
        });
        // Register a completion item provider for the new language
        const config = {
            surroundingPairs: [
                {
                    "open": "[",
                    "close": "]"
                },
                {
                    "open": "(",
                    "close": ")"
                }
            ],
            autoClosingPairs: [
                {
                    "open": "[",
                    "close": "]"
                },
                {
                    "open": "(",
                    "close": ")"
                }
            ],
            brackets: [
                ["[", "]"],
                ["(", ")"],
            ],
        }
        monaco.languages.setLanguageConfiguration(languageID, config);
    }
};