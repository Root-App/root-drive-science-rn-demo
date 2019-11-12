#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DriveScienceDemoLibrary, NSObject)

RCT_EXTERN_METHOD(initRootSdk:(NSString *)clientId userApiKey:(NSString *)userApiKey environment:(NSString *)environment callback:(RCTResponseSenderBlock)callback);


@end
