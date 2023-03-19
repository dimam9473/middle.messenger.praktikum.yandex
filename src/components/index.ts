import Handlebars from "handlebars"

import { titleTemplate } from "./title/titleTpl"
import { linkTemplate } from "./link/linkTpl"
import { inputTemplate } from "./input/inputTpl"
import { buttonTpl } from "./button/buttonTpl"

Handlebars.registerPartial('title', titleTemplate)
Handlebars.registerPartial('link', linkTemplate)
Handlebars.registerPartial('input', inputTemplate)
Handlebars.registerPartial('button', buttonTpl)
