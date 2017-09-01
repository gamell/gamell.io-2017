// Compiled by ClojureScript 1.9.908 {}
goog.provide('re_frame.events');
goog.require('cljs.core');
goog.require('re_frame.db');
goog.require('re_frame.utils');
goog.require('re_frame.interop');
goog.require('re_frame.registrar');
goog.require('re_frame.loggers');
goog.require('re_frame.interceptor');
goog.require('re_frame.trace');
re_frame.events.kind = new cljs.core.Keyword(null,"event","event",301435442);
if(cljs.core.truth_(re_frame.registrar.kinds.call(null,re_frame.events.kind))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
/**
 * `interceptors` might have nested collections, and contain nil elements.
 *   return a flat collection, with all nils removed.
 *   This function is 9/10 about giving good error messages.
 */
re_frame.events.flatten_and_remove_nils = (function re_frame$events$flatten_and_remove_nils(id,interceptors){
var make_chain = (function (p1__10320_SHARP_){
return cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.flatten.call(null,p1__10320_SHARP_));
});
if(!(re_frame.interop.debug_enabled_QMARK_)){
return make_chain.call(null,interceptors);
} else {
if(cljs.core.coll_QMARK_.call(null,interceptors)){
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",-978969032),"re-frame: when registering ",id,", expected a collection of interceptors, got: ",interceptors);
}

var chain = make_chain.call(null,interceptors);
if(cljs.core.empty_QMARK_.call(null,chain)){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",-978969032),"re-frame: when registering ",id,", given an empty interceptor chain");
} else {
}

var temp__4657__auto___10321 = cljs.core.first.call(null,cljs.core.remove.call(null,re_frame.interceptor.interceptor_QMARK_,chain));
if(cljs.core.truth_(temp__4657__auto___10321)){
var not_i_10322 = temp__4657__auto___10321;
if(cljs.core.fn_QMARK_.call(null,not_i_10322)){
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",-978969032),"re-frame: when registering ",id,", got a function instead of an interceptor. Did you provide old style middleware by mistake? Got: ",not_i_10322);
} else {
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",-978969032),"re-frame: when registering ",id,", expected interceptors, but got: ",not_i_10322);
}
} else {
}

return chain;
}
});
/**
 * Associate the given event `id` with the given collection of `interceptors`.
 * 
 * `interceptors` may contain nested collections and there may be nils
 * at any level,so process this structure into a simple, nil-less vector
 * before registration.
 * 
 * Typically, an `event handler` will be at the end of the chain (wrapped
 * in an interceptor).
 */
re_frame.events.register = (function re_frame$events$register(id,interceptors){
return re_frame.registrar.register_handler.call(null,re_frame.events.kind,id,re_frame.events.flatten_and_remove_nils.call(null,id,interceptors));
});
re_frame.events._STAR_handling_STAR_ = null;
/**
 * Given an event vector `event-v`, look up the associated interceptor chain, and execute it.
 */
re_frame.events.handle = (function re_frame$events$handle(event_v){
var event_id = re_frame.utils.first_in_vector.call(null,event_v);
var temp__4655__auto__ = re_frame.registrar.get_handler.call(null,re_frame.events.kind,event_id,true);
if(cljs.core.truth_(temp__4655__auto__)){
var interceptors = temp__4655__auto__;
if(cljs.core.truth_(re_frame.events._STAR_handling_STAR_)){
return re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",-978969032),"re-frame: while handling \"",re_frame.events._STAR_handling_STAR_,"\", dispatch-sync was called for \"",event_v,"\". You can't call dispatch-sync within an event handler.");
} else {
var _STAR_handling_STAR_10323 = re_frame.events._STAR_handling_STAR_;
re_frame.events._STAR_handling_STAR_ = event_v;

try{if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var _STAR_current_trace_STAR_10324 = re_frame.trace._STAR_current_trace_STAR_;
re_frame.trace._STAR_current_trace_STAR_ = re_frame.trace.start_trace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"operation","operation",-1267664310),event_id,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),re_frame.events.kind,new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"event","event",301435442),event_v], null)], null));

try{try{return re_frame.interceptor.execute.call(null,event_v,interceptors);
}finally {if(re_frame.trace.is_trace_enabled_QMARK_.call(null)){
var end__10274__auto___10337 = re_frame.interop.now.call(null);
var duration__10275__auto___10338 = (end__10274__auto___10337 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
var seq__10325_10339 = cljs.core.seq.call(null,cljs.core.deref.call(null,re_frame.trace.trace_cbs));
var chunk__10326_10340 = null;
var count__10327_10341 = (0);
var i__10328_10342 = (0);
while(true){
if((i__10328_10342 < count__10327_10341)){
var vec__10329_10343 = cljs.core._nth.call(null,chunk__10326_10340,i__10328_10342);
var k__10276__auto___10344 = cljs.core.nth.call(null,vec__10329_10343,(0),null);
var cb__10277__auto___10345 = cljs.core.nth.call(null,vec__10329_10343,(1),null);
try{cb__10277__auto___10345.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__10275__auto___10338,new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now.call(null))], null));
}catch (e10332){if((e10332 instanceof java.lang.Exception)){
var e__10278__auto___10346 = e10332;
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",-978969032),"Error thrown from trace cb",k__10276__auto___10344,"while storing",re_frame.trace._STAR_current_trace_STAR_,e__10278__auto___10346);
} else {
throw e10332;

}
}
var G__10347 = seq__10325_10339;
var G__10348 = chunk__10326_10340;
var G__10349 = count__10327_10341;
var G__10350 = (i__10328_10342 + (1));
seq__10325_10339 = G__10347;
chunk__10326_10340 = G__10348;
count__10327_10341 = G__10349;
i__10328_10342 = G__10350;
continue;
} else {
var temp__4657__auto___10351 = cljs.core.seq.call(null,seq__10325_10339);
if(temp__4657__auto___10351){
var seq__10325_10352__$1 = temp__4657__auto___10351;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10325_10352__$1)){
var c__8484__auto___10353 = cljs.core.chunk_first.call(null,seq__10325_10352__$1);
var G__10354 = cljs.core.chunk_rest.call(null,seq__10325_10352__$1);
var G__10355 = c__8484__auto___10353;
var G__10356 = cljs.core.count.call(null,c__8484__auto___10353);
var G__10357 = (0);
seq__10325_10339 = G__10354;
chunk__10326_10340 = G__10355;
count__10327_10341 = G__10356;
i__10328_10342 = G__10357;
continue;
} else {
var vec__10333_10358 = cljs.core.first.call(null,seq__10325_10352__$1);
var k__10276__auto___10359 = cljs.core.nth.call(null,vec__10333_10358,(0),null);
var cb__10277__auto___10360 = cljs.core.nth.call(null,vec__10333_10358,(1),null);
try{cb__10277__auto___10360.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__10275__auto___10338,new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now.call(null))], null));
}catch (e10336){if((e10336 instanceof java.lang.Exception)){
var e__10278__auto___10361 = e10336;
re_frame.loggers.console.call(null,new cljs.core.Keyword(null,"error","error",-978969032),"Error thrown from trace cb",k__10276__auto___10359,"while storing",re_frame.trace._STAR_current_trace_STAR_,e__10278__auto___10361);
} else {
throw e10336;

}
}
var G__10362 = cljs.core.next.call(null,seq__10325_10352__$1);
var G__10363 = null;
var G__10364 = (0);
var G__10365 = (0);
seq__10325_10339 = G__10362;
chunk__10326_10340 = G__10363;
count__10327_10341 = G__10364;
i__10328_10342 = G__10365;
continue;
}
} else {
}
}
break;
}
} else {
}
}}finally {re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR_10324;
}} else {
return re_frame.interceptor.execute.call(null,event_v,interceptors);
}
}finally {re_frame.events._STAR_handling_STAR_ = _STAR_handling_STAR_10323;
}}
} else {
return null;
}
});

//# sourceMappingURL=events.js.map?rel=1504247915323
