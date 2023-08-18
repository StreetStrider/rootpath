
declare namespace Rootpath
{

export type Rootpath$Segment = string | $Rootpath;

interface Recursive<T> extends Array<T|Recursive<T>> {}

export type Rootpath$Path = Rootpath$Segment | Recursive<Rootpath$Segment>;

export interface Rootpath$Resolver
{
	(...args: Rootpath$Path[]): string,
}

export interface Rootpath$Constructor
{
	new (...args: Rootpath$Path[]): $Rootpath,
	(...args: Rootpath$Path[]): $Rootpath
}

export interface $Rootpath extends Rootpath$Resolver
{
	path: string,
	resolve: Rootpath$Resolver,
	relative(to: Rootpath$Segment): string,
	partial: Rootpath$Constructor,
	contains(path: Rootpath$Segment): boolean,
	toString(): string,
}

}

declare const Rootpath: Rootpath.Rootpath$Constructor

export = Rootpath
