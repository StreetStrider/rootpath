// TODO: type naming overhaul

declare namespace Rootpath
{

export type Rootpath$Segment = (string | $Rootpath)

export type Rootpath$Path = (Rootpath$Segment | Rootpath$Path[])

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
	relative (to: Rootpath$Segment): string,
	partial: Rootpath$Constructor,
	contains (it: Rootpath$Segment): boolean,
	guard (inside: Rootpath$Segment): void,
	toString (): string,
}

}

declare const Rootpath: Rootpath.Rootpath$Constructor

export = Rootpath
