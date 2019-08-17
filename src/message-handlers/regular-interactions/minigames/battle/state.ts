import { DefaultingMap } from "../../../../utils/defaulting-dictionary";
import { Enemy } from "./enemies/enemy";
import { generateEnemy } from "./enemies/enemy-generator";
import { User } from "./users/user";

export const enemies: DefaultingMap<string, Enemy> = new DefaultingMap((_) => generateEnemy());
export const users: DefaultingMap<string, User> = new DefaultingMap((id) => new User({ id }));
