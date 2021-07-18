/**
 * Notifier listener.
 */
export type NotifierListener<Params> = (params: Params) => void;

/**
 * Notifier handler.
 */
export type NotifierNotice<Params> = (params: Params) => void;

/**
 * Notifier. Allows you to notify listeners.
 */
export class Notifier<Params> {
	/**
	 * Called before adding the first notification listener.
	 * Used to initialize any activity in inheritor.
	 */
	protected onStart();

	/**
	 * Called after removing the last notification listener.
	 * Used to finalize any activity in inheritor.
	 */
	protected onStop();

	/**
	 * Add notification listener.
	 *
	 * @param listener Listener;
	 * @param notice Handler. Called on listener notification;
	 * @param extra Additional arguments.
	 */
	public addListener(listener: NotifierListener<Params>, notice?: NotifierNotice<Params>, ...extra): void;

	/**
	 * Remove notification listener.
	 *
	 * @param listener Listener.
	 */
	public removeListener(listener: NotifierListener<Params>): void;

	/**
	 * Notify listeners.
	 *
	 * @param params Notification parameters.
	 */
	public signal(params: Params): void;
}