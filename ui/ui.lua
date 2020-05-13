GlobalUI = nil

function OnPackageStart()
    ShowHealthHUD(false)

    GlobalUI = CreateWebUI(0, 0, 0, 0, 5, 90)
    SetWebAlignment(GlobalUI, 0.0, 0.0)
    SetWebAnchors(GlobalUI, 0.0, 0.0, 1.0, 1.0)
    SetWebVisibility(GlobalUI, WEB_HITINVISIBLE)

    LoadWebFile(GlobalUI, "http://asset/"..GetPackageName().."/ui/web/dist/index.html")
end
AddEvent("OnPackageStart", OnPackageStart)

function DispatchToUI(payload)
    ExecuteWebJS(GlobalUI, "dispatchPayload("..payload..")")
end
AddRemoteEvent("GlobalUI:DispatchToUI", DispatchToUI)

function RemoteCallInterface(remoteCallType, parameters) 
    CallRemoteEvent(remoteCallType, parameters)
end
AddEvent("RemoteCallInterface", RemoteCallInterface)

function RequestToogleUI(ui)
    CallRemoteEvent("GlobalUI:ToogleWindow", ui)
end
AddEvent("RequestToogleUI", RequestToogleUI)

AddEvent("OnKeyPress", function(key)
    if key == "I" then
        CallRemoteEvent("GlobalUI:ToogleWindow", "inventory")
    end
    if key == "J" then
        CallRemoteEvent("Job:CharacterJobRequest")
    end
end)

AddEvent("SetInputMode", function(mode)
    if(mode == 0) then
        SetInputMode(0)
        ShowMouseCursor(false)
        IsMouseCursorEnabled(false)
        SetIgnoreLookInput(false)
        SetWebVisibility(GlobalUI, WEB_HITINVISIBLE)
    else
        SetInputMode(mode)
        ShowMouseCursor(true)
        IsMouseCursorEnabled(true)
        SetIgnoreLookInput(true)
        SetWebVisibility(GlobalUI, WEB_VISIBLE)
    end
end)